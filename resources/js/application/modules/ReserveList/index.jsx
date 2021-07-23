import React, {useState} from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms';
import SmokeFreeIcon from '@material-ui/icons/SmokeFree';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Tooltip from '@material-ui/core/Tooltip';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupIcon from '@material-ui/icons/Group';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import Loc from '@loc';
import {useMutation} from "@apollo/client";
import LocalStorage from '@localStorage';
import {useLocalStorage} from '@rehooks/local-storage';
import ButtonProgress from '@components/ButtonProgress';
import {CONFIRM_ORDER_MUTATION, CANCEL_ORDER_MUTATION} from '@mutations/order';
import useNotification from '@hooks/notificationHooks';
import AccountPreloader from "@components/AccountPreloader";
import FormatPrice from "@components/FormatPrice";
import Button from '@material-ui/core/Button';

export default (props) => {

    const [user] = useLocalStorage(LocalStorage.user);

    const [confirmOrderStatus, {loading}] = useMutation(CONFIRM_ORDER_MUTATION);

    const [cancelOrderStatus, {loading: cancelLoading}] = useMutation(CANCEL_ORDER_MUTATION);

    const [confirmedOrders, setConfirmedOrders] = useState([]);

    const [canceledOrders, setCanceledOrders] = useState([]);

    const {setErrorHandled, successNotification} = useNotification();

    const confirmOrder = async (id) => {

        await confirmOrderStatus({variables: {id: id}})
            .then(response => {

                successNotification(response.data.confirmOrderStatus.message);

                let orders = [...confirmedOrders];

                orders.push(id);

                setConfirmedOrders(orders);

            }).catch(error => {
                setErrorHandled(error.graphQLErrors);
            });

    };

    const cancelOrder = async (id) => {

        await cancelOrderStatus({variables: {id: id}})
            .then(response => {

                successNotification(response.data.cancelOrderStatus.message);

                let orders = [...canceledOrders];

                orders.push(id);

                setCanceledOrders(orders);

            }).catch(error => {
                setErrorHandled(error.graphQLErrors);
            });

    };

    const onScroll = (e) => {

        // if (e.target.scrollTop + e.target.clientHeight == e.target.scrollHeight && !props.loading && props.loadedAll !== true)
        //     props.callBack();

    };


    return (
        <div className="col-12">
            {props.loading && _.isUndefined(props.data) ?
                <AccountPreloader/>
                :
                <div
                    onScroll={e => onScroll(e)}
                    className={'scrolled-block'}>
                    {_.isArray(props.data) && props.data.length == 0 ?
                        <div className="row ml-0 mr-0 pt-5 pb-5 text-center">
                            <div className="col-12 pt-5">
                                <div className="h5">{Loc.app.empty_reserve}</div>
                            </div>
                            <div className="col-12 ">
                                <div className="m-auto d-block position-relative u-icon u-icon-lg u-icon-dinner"/>
                            </div>
                        </div>
                        :
                        <div className={'pl-md-3 pr-md-3'}>
                            {_.isArray(props.data) && props.data.map((item, index) => (
                                <div
                                    key={index}
                                    className="row">
                                    <div className="col-12">
                                        <Accordion className={'w-100 mb-3'}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                                <div className="row font-weight-light w-100">
                                                    <div className="col-12 col-md-5 pl-2 pr-2 mb-2 mb-md-0 d-flex">
                                                        {item.paid == true &&
                                                        <Tooltip title={Loc.app.order_paid}>
                                                            <EuroSymbolIcon
                                                                className={'icon-success d-inline-block mr-2'}/>
                                                        </Tooltip>
                                                        }
                                                        {item.delivery == true &&
                                                        <Tooltip title={Loc.app.delivery_from_rest}>
                                                            <LocalShippingIcon
                                                                className={'icon-secondary d-inline-block mr-2'}/>
                                                        </Tooltip>
                                                        }

                                                        <b className={'order-item-title d-inline-block'}>{item.place.name}</b>
                                                    </div>
                                                    <div className="col-7 col-md-4 pl-2 pr-2">
                                                        <Tooltip title={item.reserveDate}>
                                                            <div className={'small d-inline-block'}>
                                                                <span>{item.date}</span>
                                                                <span
                                                                    className={'secondary-info-block pl-1 pr-1 pt-1 pb-1 ml-2'}>{item.time}</span>
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                                                    <div className="col-5 col-md-3 pl-2 pr-2 small text-lowercase">
                                                        {(item.confirmed == true || confirmedOrders.includes(item.id)) ?
                                                            <span
                                                                className={'w-100 d-block text-center success-info-block pl-1 pr-1 pt-1 pb-1 ml-auto'}>{Loc.app.statuses.confirmed}</span>
                                                            :
                                                            (item.confirmed == false || canceledOrders.includes(item.id)) ?
                                                                <span
                                                                    className={'w-100 d-block text-center error-info-block pl-1 pr-1 pt-1 pb-1 ml-auto'}>{Loc.app.statuses.canceled}</span>
                                                                :
                                                                <span
                                                                    className={'w-100 d-block text-center secondary-info-block pl-1 pr-1 pt-1 pb-1 ml-auto'}>{Loc.app.statuses.await}</span>
                                                        }
                                                    </div>
                                                </div>

                                            </AccordionSummary>
                                            <AccordionDetails className={'d-block'}>
                                                <div className="row">
                                                    <div
                                                        className="mb-3 col-12 col-md-6 d-flex align-self-center align-items-center">
                                                        <Tooltip title={Loc.app.for_whom_reserve}>
                                                            <AccountCircleIcon/>
                                                        </Tooltip>
                                                        <div className="d-inline-block ml-2">{item.name}</div>
                                                    </div>
                                                    {item.delivery == false &&
                                                    <div
                                                        className="mb-3 col-12 col-md-6 d-flex align-self-center align-items-center">
                                                        <GroupIcon/>
                                                        <div
                                                            className="d-inline-block ml-2">
                                                            <span>{Loc.app.persons_count}: {item.persons}</span>
                                                        </div>
                                                    </div>
                                                    }
                                                    <div
                                                        className="mb-3 col-12 col-md-6 d-flex align-self-center align-items-center">
                                                        <Tooltip title={Loc.app.phone}>
                                                            <PhoneAndroidIcon/>
                                                        </Tooltip>
                                                        <div
                                                            className="d-inline-block ml-2">
                                                            <a className={'text-body'}
                                                               href={"tel:+" + item.phone}>+{item.phone}</a>
                                                        </div>
                                                    </div>
                                                    {!item.delivery &&
                                                    <div
                                                        className="mb-3 col-12 col-md-6 d-flex align-self-center align-items-center">
                                                        <Tooltip title={Loc.app.seat_zone}>
                                                            {item.smokers === true ? <SmokingRoomsIcon/> :
                                                                <SmokeFreeIcon/>}
                                                        </Tooltip>
                                                        <div
                                                            className="d-inline-block ml-2">
                                                        <span className={'text-body'}>
                                                            {item.smokers === true ? Loc.app.smokers : Loc.app.no_smokers}
                                                        </span>
                                                        </div>
                                                    </div>
                                                    }
                                                </div>
                                                <div className="text-muted font-italic mt-4">
                                                    <div>{item.comment}</div>
                                                    <div>{item.address}</div>
                                                </div>

                                                {item.items.length > 0 &&
                                                <div className="h6 text-center font-weight-light pl-5 pr-5 mb-3 mt-4">
                                                    <div className={' mx-auto '}>{Loc.app.menu}</div>
                                                    <div className="w-25 mx-auto divider-line mt-2 mb-2"/>
                                                </div>
                                                }

                                                {item.items.map((dishe, idx) => (
                                                    <div key={idx} className={"row ml-0 mr-0"}>
                                                        <div
                                                            className="align-self-center col-12 col-md-1 pr-0 d-none text-center d-md-block">
                                                            <span className={'font-weight-bold'}>{idx + 1}</span>
                                                        </div>
                                                        <div className="align-self-center col-12 col-md-5 pr-0 mb-0">
                                                            <span>{dishe.name}</span>
                                                        </div>
                                                        <div className="align-self-center col-8 col-md-4 d-flex">
                                                        <span
                                                            className={'text-lowercase'}>{Loc.app.quantity}: {dishe.quantity}</span>
                                                        </div>
                                                        <div className="align-self-center col-4 text-right col-md-2">
                                                        <span
                                                            className={'text-center font-weight-bold'}>
                                                            <FormatPrice price={dishe.price}/>
                                                        </span>
                                                        </div>
                                                        {idx < item.items.length - 1 &&
                                                        <div className="col-12">
                                                            <hr/>
                                                        </div>
                                                        }
                                                    </div>
                                                ))}
                                                {(user.user_type_id == _sharedData.userTypes.manager && _.isNull(item.confirmed) && !canceledOrders.includes(item.id) && !confirmedOrders.includes(item.id)) &&
                                                <div className="row flex-md-row-reverse justify-content-center mt-5">
                                                    <div className="col-12 col-md-6 mb-3">
                                                        <ButtonProgress
                                                            disabled={cancelLoading || loading}
                                                            onClick={e => confirmOrder(item.id)}
                                                            loading={loading}
                                                            title={Loc.app.accept}
                                                        />
                                                    </div>
                                                    <div className="col-12 col-md-6 mb-3">
                                                        <Button
                                                            disabled={cancelLoading || loading}
                                                            onClick={e => cancelOrder(item.id)}
                                                            variant="outlined"
                                                            className={'w-100 primary-outlined'}
                                                        >
                                                            {Loc.app.cancel}
                                                        </Button>
                                                    </div>
                                                </div>
                                                }
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </div>
                            ))}
                            {props.loading &&
                            <AccountPreloader/>
                            }
                        </div>
                    }
                </div>

            }
        </div>
    )

}





