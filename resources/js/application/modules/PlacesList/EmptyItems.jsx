import React  from 'react';
import Loc from '@loc';

export default (props) => {

    return (
        <div className="mt-5 mb-5 row">
            <div className="col-12 mb-5 mt-5">
                <div className={"m-auto d-block position-relative u-icon u-icon-md u-icon-empty-zoom"}/>
                <div className="mt-4 font-weight-bold h5 w-100 text-center">{Loc.app.empty_list}</div>
                <div className="mt-3 font-weight-light h5 w-100 text-center">{Loc.app.empty_list_help}</div>
            </div>
        </div>
    )

}





