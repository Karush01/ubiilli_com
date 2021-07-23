import React from 'react';
import Divider from '@material-ui/core/Divider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import StarsRating from '@containers/StarsRating';
import Loc from '@loc';
import DescriptionItem from './DescriptionItem';
import {Link} from 'react-router-dom';
import routes from '@routes';
import {formatKitchens} from '@hooks/helperHooks';
import ImageLoader from '@components/ImageLoader';
import FormatPrice from "@components/FormatPrice";


export default (props) => {


    return (
        <Link to={'/' + routes.place + '/' + props.item.slug} className={'text-body'}>
            <div
                className="row mb-3">
                <div className="col-12 col-md-5 mb-3 mb-md-0">
                    <ImageLoader src={props.item.picture.place_medium_picture}/>
                </div>
                <div className="col-12 col-md-7">

                    <div className="row mb-4">
                        <div className="col-12 col-md-7">
                            <div className="h6 font-weight-bold">{props.item.name}</div>
                        </div>
                        <div className="col-12 col-md-5 text-right">
                            <StarsRating rating={props.item.rating}/>
                            <span className={'h5 font-weight-bold ml-3'}>{props.item.rating.toFixed(1)}</span>
                        </div>
                    </div>

                    <DescriptionItem
                        icon={<LocationOnIcon/>}
                        description={props.item.address + ", " + props.item.city.description.name}
                    />
                    <DescriptionItem
                        icon={<ScheduleIcon/>}
                        description={
                            <span>
                                <span>{props.item.todaySchedule.open + " - " + props.item.todaySchedule.close}</span>
                                <sup
                                    className={'ml-2 small secondary-info-block pl-1 pr-1 text-lowercase'}>{Loc.app.today}</sup>
                             </span>
                        }
                    />
                    <DescriptionItem
                        icon={<RestaurantIcon/>}
                        description={formatKitchens(props.item.placeKitchens)}
                    />
                    <DescriptionItem
                        icon={<LocalAtmIcon/>}
                        description={<span>{Loc.app.middle_price} <FormatPrice price={props.item.middle_price}/></span>}
                    />

                    <DescriptionItem
                        icon={<MyLocationIcon/>}
                        description={Loc.app.distance + " " + (props.item.distance > 1 ? props.item.distance : (props.item.distance * 1000)) + " " + (props.item.distance > 1 ? Loc.app.km : Loc.app.meter)}
                    />

                </div>
                <div className="col-12">
                    <Divider className={'w-100 mt-2'}/>
                </div>
            </div>
        </Link>
    )

}





