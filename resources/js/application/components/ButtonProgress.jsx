import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import {buttonProgress} from '@app';

export default (props) => {

    return (
        <Button
            disabled={props.loading || props.disabled}
            variant="contained"
            onClick={props.onClick}
            className={'w-100 primary ' + (!_.isUndefined(props.className) ? props.className : '')}>
            {props.title}
            {props.loading &&
            <CircularProgress
                thickness={buttonProgress.thickness}
                className={'position-absolute text-white button-progress '}
                size={buttonProgress.size}/>
            }
        </Button>
    )

}





