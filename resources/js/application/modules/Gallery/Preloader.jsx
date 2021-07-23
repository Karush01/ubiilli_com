import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default (props) => {

    return (
        <div className="row">
            <div className="col-12 col-md-8">
                <Skeleton variant="rect" width={'100%'} height={358}/>
            </div>
            <div className="col-12 col-md-4  d-md-block d-none">
                <div className="align-content-between d-flex flex-wrap h-100">
                    <div className={'col-12 pr-0 pl-0'}>
                        <Skeleton variant="rect" width={'100%'} height={168}/>
                    </div>
                    <div className={'col-12 pr-0 pl-0'}>
                        <Skeleton variant="rect" width={'100%'} height={168}/>
                    </div>
                </div>
            </div>
        </div>
    )

}





