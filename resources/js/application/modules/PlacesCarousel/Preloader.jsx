import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default (props) => {

    return (
        <div className={'row pb-3 ml-3 mr-3'}>
            <div className="col-12 pl-0 pr-0 pt-3">
                <Skeleton
                    height={180}
                    width={'100%'}
                    variant="rect"
                />
            </div>
            <div className="col-7 mt-2 pl-2 pr-2">
                <Skeleton
                    width={'100%'}
                    variant={'text'}
                />
            </div>
            <div className="col-9 pl-2 pr-2 mt-1">
                <Skeleton
                    width={'100%'}
                    variant={'text'}
                />
            </div>
            <div className="col-2 offset-1 pl-3 pr-2 mt-1">
                <Skeleton variant="circle" width={'100%'}/>
            </div>
            <div className="col-6 pl-2 pr-2 mt-1">
                <Skeleton
                    width={'100%'}
                    variant={'text'}
                />
            </div>
            <div className="col-9 mt-2 pl-2 pr-2 mt-1">
                <Skeleton
                    width={'100%'}
                    variant={'text'}
                />
            </div>

        </div>
    )

}





