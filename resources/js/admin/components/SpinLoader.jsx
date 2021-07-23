import React from 'react';
import {Spin} from 'antd';

export default (props) => {


    return (
        <div className={'col h-100 mx-auto my-auto'}>
            <div className="h-100 row justify-content-center align-items-center">
                <Spin size="large"/>
            </div>
        </div>
    )
}
