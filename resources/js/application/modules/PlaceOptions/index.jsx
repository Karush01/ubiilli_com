import React from 'react';
import Preloader from "./Preloader";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

export default (props) => {

    return (
        <div>
            {props.loading ?
                <Preloader/>
                :
                <div className={'row mt-5'}>
                    {_.chunk(props.data.getPlace.placeOptions, 3).map((item, index) => (
                        <div
                            key={index}
                            className="col-12 col-md-6 pl-2 pl-md-3">
                            {item.map((option, key) => (
                                <div
                                    key={key}
                                    className="row  mb-3">
                                    <div className="col-2 align-self-center text-right">
                                        <CheckCircleOutlineIcon className={'mt-n1 icon-secondary'}/>
                                    </div>
                                    <div className="col-10 align-self-center pl-1">
                                        <div
                                            className={'h6 font-weight-light mb-0'}>{option.option.description.name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            }
        </div>
    )

}





