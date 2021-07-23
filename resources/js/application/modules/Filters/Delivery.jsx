import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Loc from '@loc';
import IOSSwitch from "@components/IOSSwitch";


export default (props) => {

    return (
        <FormControlLabel
            className={'ml-0 filter-label w-100 mb-0'}
            control={<IOSSwitch
                name={'delivery'}
                onChange={e => props.returnValue(e.target.name, e.target.checked)}
                checked={Boolean(props.value) && !!props.value}/>}
            label={<span className={'font-weight-light'}>{Loc.app.rest_delivery}</span>}
            labelPlacement={'start'}
        />
    )

}





