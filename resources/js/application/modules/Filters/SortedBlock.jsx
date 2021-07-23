import React from 'react';
import Loc from '@loc';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default (props) => {

    return (
        <FormControl className={'mb-3 w-100'}>
            <Select
                onChange={e => props.returnValue(e.target.name, e.target.value)}
                name={'sort'}
                className={'w-100 sorted-block'}
                value={(props.sort == null) ? 'default' : props.sort}
            >
                {Object.keys(Loc.app.sort_type).map((item, index) => (
                    <MenuItem
                        key={index}
                        value={item}>{Loc.app.sort_by} {Loc.app.sort_type[item]}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )

}





