import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import ListItem from '@material-ui/core/ListItem';

export default (props) => {

    const height = 30;

    return (
        <div className="w-100">
            {new Array(6).fill(undefined).map((item, index) => (
                <ListItem
                    key={index}
                    className={'pl-2 pr-0 row ml-0 mr-0'}
                    dense={true} button>
                    <div className="col-2 pl-0">
                        <Skeleton variant="text" style={{width: 20, height: height}}/>
                    </div>
                    <div className="col-10 pl-0 pr-0">
                        <Skeleton variant="text" className={'w-100'} style={{height: height}}/>
                    </div>

                </ListItem>
            ))}
        </div>
    )

}





