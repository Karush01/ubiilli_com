import React from 'react';

export default (props) => {

    return (
        <div className="row mb-3">
            <div className="col-2 col-md-1 align-self-center">
                {props.icon}
            </div>
            <div className="col-10 col-md-10 place-desc-item align-self-center">
                {props.description}
            </div>
        </div>
    )

}





