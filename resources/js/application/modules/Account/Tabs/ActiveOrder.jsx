import React, { useState } from 'react';
import Title from "../Title";
import Loc from '@loc';
import moment from 'moment';
import { datesFormat } from '@app';
import { GET_ACCOUNT_ACTIVE_ORDER } from '@queries/user';
import { SEND_ORDER_TO_KITCHEN_MUTATION } from '@mutations/user';
import { useQuery, useMutation } from "@apollo/client";
import { fetchingData } from '@app';
import ButtonProgress from '@components/ButtonProgress';
import AccountPreloader from "@components/AccountPreloader";
import FormatPrice from "@components/FormatPrice";

const params = {
    time: moment().format(datesFormat.timeFormat), date: moment().format(datesFormat.date)
}
export default (props) => {

    const [successSended, setSuccessSended] = useState(undefined);

    //витягнемо актуальний ордер
    const { data, error, loading } = useQuery(GET_ACCOUNT_ACTIVE_ORDER, {
        variables: params,
        fetchPolicy: fetchingData.noCache
    });

    const [sendToKitchen, { loading: loadingConfirm }] = useMutation(SEND_ORDER_TO_KITCHEN_MUTATION, {
        variables: params,
        onCompleted: (data) => {

            setSuccessSended(data.sendToKitchen.message);

        },
        fetchPolicy: fetchingData.noCache
    });

    return (
        <div className="row">
            <Title
                title={Loc.app.account_menu.active_order}
            />
            {loading ?
                <div className="col-12">
                    <AccountPreloader />
                </div>
                :
                <div className={'col-12'}>
                    {!_.isUndefined(data) && !_.isUndefined(data.getActiveOrder) && !_.isNull(data.getActiveOrder) ?
                        <div className={'row'}>
                            {!_.isUndefined(successSended) ?
                                <div className="col-12">
                                    <div className="text-center h4 mt-5 pt-5">{successSended}</div>
                                </div>
                                :

                                <div className="col-12">
                                    <div
                                        className="h6 font-weight-light">{Loc.app.rest} {data.getActiveOrder.place.name}</div>
                                    <div className="w-100 text-center mb-3 text-muted mt-3">{Loc.app.menu}</div>
                                    {data.getActiveOrder.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="row mb-3 mt-3">
                                            <div className="col-9">
                                                <span className={'font-weight-light text-muted'}>{item.name}</span>
                                            </div>
                                            <div className="col-3 text-right">
                                                <span
                                                    className={'font-weight-bold'}>
                                                    <FormatPrice price={item.price} />
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    <div
                                        className="w-100 text-center mb-4 mt-5 text-muted small">{Loc.app.active_order_help}</div>

                                    <div className="row justify-content-center ">
                                        <div className="col-12 col-md-7 ">
                                            <ButtonProgress
                                                className={' m-auto  mt-4'}
                                                disabled={loadingConfirm || loadingConfirm}
                                                onClick={e => sendToKitchen()}
                                                loading={loadingConfirm}
                                                title={Loc.app.send_to_kitchen}
                                            />

                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                        :

                        <div className="row pt-5 pb-5 text-center">
                            <div className="col-12 pt-5">
                                <div className="h5">{Loc.app.empty_active_order}</div>
                            </div>
                            <div className="col-12 mt-4 ">
                                <div
                                    className="m-auto d-block position-relative u-icon u-icon-md  u-icon-empty-active " />
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )

}





