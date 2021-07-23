import React from 'react';
import Title from '@containers/Title';

export default (props) => {


    return (
        <section className={'pt-5 pb-5 container-fluid w-100 bg-light pl-0 pr-0'}>
            <div className="container">
                <dir className="row justify-content-center">
                    <div className="col-12 col-md-5 align-self-center text-center">
                        <div className="h3">
                            <Title
                                meta={props.meta}
                                slug={props.slug}
                                title={props.title}
                            />
                        </div>
                        <div className={'w-25 mx-auto divider-line mt-3 mb-2'}></div>
                    </div>
                    <div className="col-12 col-md-5 align-self-center">
                        <div className={"m-auto u-icon u-icon-big u-icon-" + props.icon}></div>
                    </div>
                </dir>
            </div>
        </section>
    )

}





