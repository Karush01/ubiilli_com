import React from 'react';
import {search} from '@app';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';

export default (props) => {

    const circleSize = 20;

    return (
        <div className="col-12">
            {new Array(search.pageItems).fill(undefined).map((item, index) => (
                <div
                    key={index}
                    className="row mb-3">
                    <div className="col-12 col-md-5  mb-3 mb-md-0">
                        <Skeleton variant="rect" className={'w-100'} height={230}/>
                    </div>

                    <div className="col-12 col-md-7">
                        <div className="row mb-4">
                            <div className="col-12 col-md-7">
                                <Skeleton variant="text" className={'w-100'}/>
                            </div>
                            <div className="col-12 col-md-4 offset-md-1">
                                <Skeleton variant="text" className={'w-100'}/>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-12 col-md-1 align-self-center">
                                <Skeleton variant="circle" height={circleSize} width={circleSize}/>
                            </div>
                            <div className="col-12 col-md-6 ">
                                <Skeleton variant="text" className={'w-100'}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12 col-md-1 align-self-center">
                                <Skeleton variant="circle" height={circleSize} width={circleSize}/>
                            </div>
                            <div className="col-12 col-md-6 ">
                                <Skeleton variant="text" className={'w-100'}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12 col-md-1 align-self-center">
                                <Skeleton variant="circle" height={circleSize} width={circleSize}/>
                            </div>
                            <div className="col-12 col-md-6 ">
                                <Skeleton variant="text" className={'w-100'}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12 col-md-1 align-self-center">
                                <Skeleton variant="circle" height={circleSize} width={circleSize}/>
                            </div>
                            <div className="col-12 col-md-6 ">
                                <Skeleton variant="text" className={'w-100'}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-12 col-md-1 align-self-center">
                                <Skeleton variant="circle" height={circleSize} width={circleSize}/>
                            </div>
                            <div className="col-12 col-md-6 ">
                                <Skeleton variant="text" className={'w-100'}/>
                            </div>
                        </div>

                    </div>
                    <div className="col-12">
                        <Divider className={'w-100 mt-2'}/>
                    </div>
                </div>
            ))}
        </div>
    )

}





