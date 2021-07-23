import React, {useState} from 'react';
import Title from "../Title";
import Loc from '@loc';
import {GET_USER_BALANCE} from '@queries/user';
import {useQuery, useMutation} from "@apollo/client";
import {form} from '@app';
import TextField from '@material-ui/core/TextField';
import ButtonProgress from '@components/ButtonProgress';
import app from '@app';
import {CREATE_IBAN} from '@mutations/user';
import useNotification from '@hooks/notificationHooks';
import AccountPreloader from "@components/AccountPreloader";
import FormatPrice from "@components/FormatPrice";

export default (props) => {

    const {data, error, loading} = useQuery(GET_USER_BALANCE);

    const {setErrorHandled, successNotification} = useNotification();

    const [iban, setIban] = useState('');

    const [disableInput, setDisableInput] = useState(false);

    const [createIban, {loading: createLoading}] = useMutation(CREATE_IBAN, {
        variables: {iban: iban},
        onError: (error) => {
            setErrorHandled(error.graphQLErrors);
        },
        onCompleted: (data) => {
            successNotification(data.createIban.message);
            setDisableInput(true);
        }
    });

    return (

        <div className="row">
            <Title
                title={Loc.app.finances}
                subtitle={Loc.app.finances_desc}
            />

            <div className="col-12 scrolled-block pb-4">

                {loading ?
                    <AccountPreloader/>
                    :

                    <div className={'shadow-block p-1 pl-md-3 pr-md-3 pt-md-4 pb-md-4 mt-5 mb-5'}>
                        <div className="row">
                            <div className="col-12 col-md-6 mb-4 d-flex justify-content-between align-items-center">
                                <div className={'d-table'}><span>{Loc.app.on_balance}</span></div>
                                <div
                                    className="b-orange-block">
                                    <FormatPrice price={data.getBalance.amount}/>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-4 d-flex justify-content-between align-items-center ">
                                <div className={'d-table'}><span>{Loc.app.available}</span></div>
                                <div
                                    className="b-orange-block">
                                    <FormatPrice price={data.getBalance.withdraw}/>
                                </div>
                            </div>

                            <div className="col-12 mb-4 mt-4">
                                <TextField
                                    className={'w-100 font-weight-light'}
                                    size={form.size}
                                    disabled={disableInput || !_.isNull(data.getBalance.iban)}
                                    variant="outlined"
                                    onChange={e => setIban(e.target.value.replace(/\s+/g, '').toUpperCase().slice(0, app.ibanLength))}
                                    name={'iban'}
                                    value={!_.isNull(data.getBalance.iban) ? data.getBalance.iban : iban}
                                    autoComplete={'off'}
                                    placeholder={Loc.app.enter_iban}
                                    helperText={Loc.app.change_iban}
                                />
                            </div>

                            {!disableInput && _.isNull(data.getBalance.iban) &&
                            <div className="col-12">
                                <div className="row justify-content-end">
                                    <div className="col-12 col-md-5 text-right">
                                        <ButtonProgress
                                            onClick={e => createIban()}
                                            loading={createLoading}
                                            title={Loc.app.save}
                                        />
                                    </div>
                                </div>
                            </div>
                            }
                        </div>

                    </div>
                }

            </div>
        </div>
    )

}





