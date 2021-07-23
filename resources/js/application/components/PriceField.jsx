import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {GET_ACTIVE_CURRENCY} from "../store/queries";
import {useQuery} from "@apollo/client";


export default (props) => {
    const {data} = useQuery(GET_ACTIVE_CURRENCY);
    return (
        <TextField
            {...props}
            type={'number'}
            InputProps={{
                endAdornment: <InputAdornment
                    className={'font-weight-light'}
                    position="end">{data.activeCurrency.label}</InputAdornment>,
            }}
        />
    )

}





