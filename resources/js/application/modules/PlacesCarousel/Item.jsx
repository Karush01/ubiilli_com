import React from 'react';
import StarsRating from '@containers/StarsRating';
import {Link} from 'react-router-dom';
import routes from '@routes';
import ImageLoader from '@components/ImageLoader';

export default (props) => {

    return (
        <Link
            className="row place-carousel-item pb-3 pt-4 position-relative ml-3 mr-3 text-body"
            to={'/' + routes.place + '/' + props.item.slug}>

            <div className="simple-slider-hover" />
            <div className="col-12 pl-0 pr-0">
                <ImageLoader src={props.item.picture.place_medium_picture}/>
            </div>
            <div className="col-12 mt-2 mb-2 pl-2 pr-2">
                <span>{props.item.placeType.description.name}</span>
            </div>

            <div className="col-9 pl-2 pr-2">
                <span className={'font-weight-bold h6 about-place d-block mb-0'}>{props.item.name}</span>
            </div>
            <div className="col-3 pl-2 pr-2 text-right">
                <span className={'font-weight-bold h6 mb-0'}>{props.item.rating.toFixed(1)}</span>
            </div>

            <div className="col-12 pl-2 pr-2">
                <StarsRating rating={props.item.rating}/>
            </div>
            <div className="col-12 mt-2 pl-2 pr-2">
                <span>{props.item.zip} {props.item.city.description.name}</span>
            </div>
        </Link>
    )

}





