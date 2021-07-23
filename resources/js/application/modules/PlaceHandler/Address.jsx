import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Loc from '@loc';
import {form} from '@app';
import TextField from '@material-ui/core/TextField';

export default (props) => {

    return (

        <div className="row">
            <div className="col-12 col-md-6 mb-4">

                <FormControl
                    size={form.size}
                    variant="outlined" className={'w-100'}>
                    <InputLabel id="demo-simple-select-outlined-label">{Loc.app.city}</InputLabel>
                    <Select
                        onChange={e => props.changeData(props.parent, e.target.value, e.target.name)}
                        name={'city_id'}
                        value={props.data.city_id}
                        label={Loc.app.city}
                    >
                        {_sharedData.cities.map((item, index) => (
                            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                        ))
                        }
                    </Select>
                </FormControl>

            </div>

            <div className="col-12 col-md-6 mb-4">
                <TextField
                    onChange={e => props.changeData(props.parent, e.target.value, e.target.name)}
                    className={'w-100 font-weight-light'}
                    size={form.size}
                    variant="outlined"
                    value={props.data.zip}
                    name={'zip'}
                    label={Loc.app.zip}
                />
            </div>

            <div className="col-12 mb-4">
                <TextField
                    className={'w-100 font-weight-light'}
                    size={form.size}
                    variant="outlined"
                    onChange={e => props.changeData(props.parent, e.target.value, e.target.name)}
                    value={props.data.address}
                    name={'address'}
                    label={Loc.app.address}
                />
            </div>
        </div>
    )

}





