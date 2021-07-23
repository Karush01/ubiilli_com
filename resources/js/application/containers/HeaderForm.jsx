import React from 'react';

export default (props) => {

    return (
        <div className="pt-5 pb-5 w-100 bg-light pl-0 pr-0">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )

}





