import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default (props) => {

    const preloaderItems = 15;

    const items = [];

    for (let i = 0; i < preloaderItems; i++) {
        items.push(
            <div
                key={i}
                className="faq-item mb-3 mt-3 pt-2 pb-2">
                <div className="row m-0">
                    <div className="col-1 align-self-center pr-0">
                        <Skeleton variant="circle" height={20} width={20}/>
                    </div>
                    <div className="col-10 pl-0 pr-0">
                        <Skeleton variant="text" height={40}/>
                    </div>
                    <div className="col-1 align-self-center pl-0">
                        <Skeleton className={'ml-auto'} variant="circle" height={20} width={20}/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={'row'}>
            <div className="col-12">
                {items}
            </div>
        </div>
    )

}





