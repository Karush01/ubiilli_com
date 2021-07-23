import React from 'react';
import Loc from '@loc';

export default (props) => {

    return (
        <div className="row mt-5 mb-5">
            {Object.keys(Loc.app.our_advantages).map((item, index) => (
                <div
                    key={index}
                    className={"col-6 col-md-4 col-lg-2 mb-4 transition-icon"}>
                    <div className={"m-auto d-block position-relative u-icon u-icon-" + item} />
                    <div className="w-75 mx-auto divider-line mt-3 mb-2" />
                    <span
                        className={'mt-2 d-block font-weight-bold text-center w-100'}>{Loc.app.our_advantages[item]}</span>

                </div>
            ))}
        </div>
    )

}





