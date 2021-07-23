import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default (props) => {

    const circleSize = 20;

    return (
        <div className="row">
            <div className="col-12 ">
                <div className="row">
                    <div className="col-12 col-md-5 offset-md-7 mb-2">
                        <Skeleton variant="text" width={'100%'}/>
                    </div>

                    <div className="col-10 col-md-9">
                        <Skeleton height={24} variant="text" width={'100%'}/>
                    </div>
                    <div className="col-2 col-md-3">
                        <Skeleton className={'ml-auto'} variant="circle" width={circleSize} height={circleSize}/>
                    </div>

                    <div className="col-12 mt-3">
                        <div className="row mb-3">
                            <div className="col-12 col-md-1 align-self-center">
                                <Skeleton variant="circle" height={circleSize} width={circleSize}/>
                            </div>
                            <div className="col-12 col-md-8 ">
                                <Skeleton variant="text" className={'w-100'}/>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-12 col-md-1 align-self-center">
                                <Skeleton variant="circle" height={circleSize} width={circleSize}/>
                            </div>
                            <div className="col-12 col-md-8 ">
                                <Skeleton variant="text" className={'w-100'}/>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-12 col-md-1 align-self-center">
                                <Skeleton variant="circle" height={circleSize} width={circleSize}/>
                            </div>
                            <div className="col-12 col-md-8 ">
                                <Skeleton variant="text" className={'w-100'}/>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-12 col-md-1 align-self-center">
                                <Skeleton variant="circle" height={circleSize} width={circleSize}/>
                            </div>
                            <div className="col-12 col-md-8 ">
                                <Skeleton variant="text" className={'w-100'}/>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-12 col-md-1 align-self-center">
                                <Skeleton variant="circle" height={circleSize} width={circleSize}/>
                            </div>
                            <div className="col-12 col-md-8 ">
                                <Skeleton variant="text" className={'w-100'}/>
                            </div>
                        </div>


                    </div>

                    <div className="col-12  mt-3">
                        <div className="row justify-content-center">
                            <div className="col-11 mb-3">
                                <Skeleton variant="text" className={'pt-3 pb-3'} width={'100%'}/>
                            </div>
                            <div className="col-11 mb-3">
                                <Skeleton variant="text" className={'pt-3 pb-3'} width={'100%'}/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}





