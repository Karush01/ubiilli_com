import React from 'react';
import Loc from '@loc';
import {form} from '@app';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

export default (props) => {

    return (
        <TextField
            {...props}
            label={Loc.app.phone}
            className={'w-100 font-weight-light'}
            size={form.size}
            variant="outlined"
            name={'phone'}
            type={'number'}
            InputProps={{
                startAdornment: <InputAdornment
                    className={'font-weight-light mr-0 phone-adornment'}
                    position="start">+</InputAdornment>,
            }}
            autoComplete={'off'}
        />
    )

}





