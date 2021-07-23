import React from 'react';
import Loc from '@loc';
import Button from "@material-ui/core/Button";
import {createStripeLink} from '@hooks/helperHooks';

export default (props) => {


    return (
        <div className="row pt-5 pb-5 justify-content-center">
            <div className="col-12 pt-5 pb-3 col-md-4">
                <div className={"m-auto d-block position-relative u-icon u-icon-md u-icon-thank-you"}/>
            </div>
            <div className="col-12 text-center w-100">
                <div className="h5 font-weight-light">{Loc.app.thank_you}</div>
            </div>

            <div className="col-12 text-center w-100 pb-5">
                <div className="font-weight-light">{Loc.app.admin_connect}</div>
            </div>

            {!_.isNull(props.token) &&
            <div className="col-12 text-center w-100 pb-5">
                <Button
                    onClick={e => createStripeLink(props.token)}
                    className={'pl-4 pr-4 m-auto d-block mt-4 secondary'}>
                    {Loc.app.pay}
                </Button>
            </div>
            }

        </div>
    )

}





