import React from 'react';
import TextField from '@material-ui/core/TextField';
import {form} from '@app';
import {GET_MENU_CATEGORIES} from '@queries/menu-category';
import {useQuery} from "@apollo/client";
import Loc from '@loc';
import ButtonProgress from '@components/ButtonProgress';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PriceField from "@components/PriceField";


export default (props) => {

    const {loading, error, data} = useQuery(GET_MENU_CATEGORIES);

    return (
        <div className="row">
            {_.isUndefined(props.item.id) &&
            <div className="col-12 mb-4">
                <FormControl
                    size={form.size}
                    variant="outlined" className={'w-100'}>
                    <InputLabel>{Loc.app.category}</InputLabel>
                    <Select
                        onChange={e => props.changeData(e.target.value, e.target.name)}
                        name={'menu_category_id'}
                        value={props.item.menu_category_id}
                        label={Loc.app.category}
                    >
                        {!_.isUndefined(data) && data.getMenuCategories.map((item, key) => (
                            <MenuItem key={key} value={item.id}>{item.description.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            }

            <div className="col-12 col-md-9 mb-4">
                <TextField
                    className={'w-100 font-weight-light'}
                    size={form.size}
                    onChange={e => props.changeData(e.target.value, e.target.name)}
                    name={'name'}
                    value={props.item.name}
                    variant="outlined"
                    label={Loc.app.place_handler.menu_name}
                />
            </div>
            <div className="col-12 col-md-3 mb-4">
                <PriceField
                    className={'w-100 font-weight-light'}
                    size={form.size}
                    variant="outlined"
                    onChange={e => props.changeData(e.target.value, e.target.name)}
                    name={'price'}
                    value={props.item.price}
                    label={Loc.app.place_handler.price}
                />
            </div>
            <div className="col-12 mb-4">
                <TextField
                    className={'w-100 font-weight-light'}
                    size={form.size}
                    variant="outlined"
                    onChange={e => props.changeData(e.target.value, e.target.name)}
                    value={props.item.description}
                    name={'description'}
                    multiline
                    rows={3}
                    label={Loc.app.place_handler.menu_desc}
                />
            </div>
            <div className="col-12 col-md-4 justify-content-end ml-auto">
                <ButtonProgress
                    loading={props.loading}
                    onClick={e => props.callBack(e)}
                    className={'w-100 primary mb-4'}
                    title={Loc.app.save}
                />
            </div>
        </div>
    )

}





