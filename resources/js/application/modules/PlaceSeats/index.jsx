import React from 'react';
import Preloader from "./Preloader";
import Loc from '@loc';


export default (props) => {

    return (
        <div>
            {props.loading ?
                <Preloader/>
                :
                <div className="row">
                    <div className="col-12 col-md-4 align-items-center d-flex justify-content-center">
                        <div className="align-content-center d-flex">
                            <div>
                                <div
                                    className={'items-count-block align-items-center d-flex items-count-block text-center mx-auto'}>
                                    <div className={'m-auto'}>{props.data.getPlace.tables_count}</div>
                                </div>
                                <div className={'mt-2'}>{Loc.app.tables_count}</div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className={"m-auto d-block position-relative u-icon u-icon-md u-icon-furniture"}/>
                    </div>

                    <div className="col-12 col-md-4 align-items-center d-flex justify-content-center">
                        <div className="align-content-center d-flex">
                            <div>
                                <div
                                    className={'items-count-block align-items-center d-flex items-count-block text-center mx-auto'}>
                                    <div className={'m-auto'}>{props.data.getPlace.tables_seats}</div>
                                </div>
                                <div className={'mt-2'}>{Loc.app.seats_count}</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )

}





