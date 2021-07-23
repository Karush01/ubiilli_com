import React, {useState} from 'react';

export default (props) => {

    return (
        <div className="w-100 pl-3 pr-3 mb-4">
            <span className={'h4 font-weight-light b-block w-100'}>{props.title}</span>
            {!_.isUndefined(props.subtitle) &&
            <small className={'text-muted font-weight-light d-block w-100'}>{props.subtitle}</small>
            }
        </div>
    )

}





