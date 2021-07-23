import React from 'react';
import Preloader from "./Preloader";
import StarsRating from '@containers/StarsRating';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import DescriptionItem from './DescriptionItem';
import {formatKitchens} from '@hooks/helperHooks';
import PhoneIcon from '@material-ui/icons/Phone';
import Loc from '@loc';
import Button from '@material-ui/core/Button';
import Title from '@containers/Title';
import {useLocalStorage} from '@rehooks/local-storage';
import LocalStorage from '@localStorage';
import {reserve} from '@app';
import Tooltip from '@material-ui/core/Tooltip';
import FormatPrice from "@components/FormatPrice";


export default (props) => {

    const [localCartItems] = useLocalStorage(LocalStorage.cartItems);

    return (
        <div className="row position-sticky  place-actions-container mb-3 ml-0 mr-0">
            <div className="col-12 bg-white place-actions pt-3 pb-4">
                {props.loading ?
                    <Preloader/>
                    :
                    <div className="row">
                        <div className="col-12 text-right mb-2">
                            <StarsRating rating={props.data.getPlace.rating}/>
                        </div>

                        <div className="col-10 pr-0 col-md-9 h5 font-weight-bold place-desc-item mb-4">
                            <Title
                                title={props.data.getPlace.name}
                            />
                        </div>
                        <div className="col-2 col-md-3 pl-1 text-right">
                            {props.data.getPlace.rating > 0 &&
                            <span
                                className={'h5 font-weight-bold  mb-4'}>{props.data.getPlace.rating.toFixed(1)}</span>
                            }
                        </div>

                        <div className="col-12 mb-3 ">
                            <Tooltip
                                title={props.data.getPlace.address + ", " + props.data.getPlace.city.description.name}>
                                <div>
                                    <DescriptionItem
                                        icon={<LocationOnIcon/>}
                                        description={<a
                                            target={'_blank'}
                                            className={'text-body'}
                                            href={'https://maps.google.com/?q=' + props.data.getPlace.address + ", " + props.data.getPlace.city.description.name}>{props.data.getPlace.address + ", " + props.data.getPlace.city.description.name}</a>
                                        }
                                    />
                                </div>
                            </Tooltip>

                            <DescriptionItem
                                icon={<PhoneIcon/>}
                                description={<a className={'text-body'}
                                                href={'tel:+' + props.data.getPlace.phone}>+{props.data.getPlace.phone}</a>}
                            />
                            <DescriptionItem
                                icon={<ScheduleIcon/>}
                                description={
                                    <span>
                                        <span>{props.data.getPlace.todaySchedule.open + " - " + props.data.getPlace.todaySchedule.close}</span>
                                        <sup
                                            className={'ml-2 small secondary-info-block pl-1 pr-1 text-lowercase'}>{Loc.app.today}</sup>
                                    </span>
                                }
                            />
                            <DescriptionItem
                                icon={<RestaurantIcon/>}
                                description={formatKitchens(props.data.getPlace.placeKitchens)}
                            />
                            <DescriptionItem
                                icon={<LocalAtmIcon/>}
                                description={
                                    <span>{Loc.app.middle_price} <FormatPrice price={props.data.getPlace.middle_price}/> </span>}
                            />
                        </div>
                        <div className="col-12 col-md-11 mx-auto mt-3">
                            <Button
                                disabled={_.isUndefined(props.data) || _.isUndefined(localCartItems) || !localCartItems.hasOwnProperty(props.data.getPlace.id) || _.isEmpty(localCartItems[props.data.getPlace.id])}
                                onClick={e => props.handleOpenReserve(reserve.reserve)}
                                variant="contained"
                                className={'w-100 primary'}>
                                {Loc.app.reserve}
                            </Button>
                        </div>
                        <div className="col-12 col-md-11 mx-auto mt-4">
                            <Button
                                disabled={!props.data.getPlace.delivery || _.isUndefined(localCartItems) || !localCartItems.hasOwnProperty(props.data.getPlace.id) || _.isEmpty(localCartItems[props.data.getPlace.id])}
                                variant="outlined"
                                onClick={e => props.handleOpenReserve(reserve.order)}
                                className={'w-100 primary-outlined'}>
                                {Loc.app.order_food_btn}
                            </Button>
                        </div>

                    </div>
                }
            </div>
        </div>
    )

}





