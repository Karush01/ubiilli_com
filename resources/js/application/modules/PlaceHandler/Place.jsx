import React from 'react';
import TextField from '@material-ui/core/TextField';
import Loc from '@loc';
import {form} from '@app';
import {GET_KITCHENS} from '@queries/kitchen';
import {GET_OPTIONS} from '@queries/option';
import {GET_TYPES} from '@queries/type';
import {useQuery} from "@apollo/client";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PhoneField from "@containers/PhoneField";
import MultiSelect from "@components/MultiSelect";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IOSSwitch from "@components/IOSSwitch";
import PriceField from '@components/PriceField';


export default (props) => {

    const {loading: kitchensLoading, error: kitchensError, data: kitchensData} = useQuery(GET_KITCHENS);

    const {loading: optionsLoading, error: optionsError, data: optionsData} = useQuery(GET_OPTIONS);

    const {loading: typesLoading, error: typesError, data: typesData} = useQuery(GET_TYPES);

    return (
        <div className="row">
            <div className="col-12 mb-4">
                <TextField
                    className={'w-100 font-weight-light'}
                    size={form.size}
                    variant="outlined"
                    value={props.data.name}
                    name={'name'}
                    onChange={e => props.changeData(props.parent, e.target.value, e.target.name)}
                    label={Loc.app.place_handler.name}
                />
            </div>

            <div className="col-12 mb-4">

                <FormControl
                    size={form.size}
                    variant="outlined" className={'w-100'}>
                    <InputLabel id="demo-simple-select-outlined-label">{Loc.app.rest_type}</InputLabel>
                    <Select
                        onChange={e => props.changeData(props.parent, e.target.value, e.target.name)}
                        name={'type_id'}
                        value={props.data.type_id}
                        label={Loc.app.rest_type}
                    >
                        {!_.isUndefined(typesData) && typesData.getTypes &&
                        typesData.getTypes.map((item, index) => (
                            <MenuItem key={index} value={item.id}>{item.description.name}</MenuItem>
                        ))
                        }
                    </Select>
                </FormControl>

            </div>

            <div className="col-12 mb-4">

                <MultiSelect
                    name={'kitchens'}
                    loading={kitchensLoading}
                    label={Loc.app.kitchens}
                    subLabel={Loc.app.place_handler.select_kitchens}
                    onChange={props.changeData}
                    values={props.kitchens}
                    data={!_.isUndefined(kitchensData) ? kitchensData.getKitchens : []}
                />
            </div>

            <div className="col-12 mb-4">

                <MultiSelect
                    name={'options'}
                    loading={optionsLoading}
                    label={Loc.app.options}
                    subLabel={Loc.app.place_handler.select_options}
                    onChange={props.changeData}
                    values={props.options}
                    data={!_.isUndefined(optionsData) ? optionsData.getOptions : []}
                />
            </div>

            <div className="col-12 col-md-6 mb-4">
                <PhoneField
                    onChange={e => props.changeData(props.parent, e.target.value, e.target.name)}
                    value={props.data.phone}
                />
            </div>

            <div className="col-12 col-md-6 mb-4">
                <PriceField
                    onChange={e => props.changeData(props.parent, e.target.value, e.target.name)}
                    className={'w-100 font-weight-light'}
                    size={form.size}
                    variant="outlined"
                    value={props.data.middle_price}
                    name={'middle_price'}
                    label={Loc.app.place_handler.middle_price}
                />
            </div>

            <div className="col-12 col-md-6 mb-4">
                <TextField
                    onChange={e => props.changeData(props.parent, e.target.value, e.target.name)}
                    className={'w-100 font-weight-light'}
                    size={form.size}
                    variant="outlined"
                    value={props.data.tables_count}
                    name={'tables_count'}
                    type={'number'}
                    label={Loc.app.tables_count}
                />
            </div>

            <div className="col-12 col-md-6 mb-4">
                <TextField
                    onChange={e => props.changeData(props.parent, e.target.value, e.target.name)}
                    className={'w-100 font-weight-light'}
                    size={form.size}
                    variant="outlined"
                    value={props.data.tables_seats}
                    name={'tables_seats'}
                    type={'number'}
                    label={Loc.app.seats_count}
                />
            </div>

            <div className="col-12 col-md-5 mb-4">
                <FormControlLabel
                    className={'ml-0 filter-label w-100 mb-0'}
                    control={<IOSSwitch
                        name={'delivery'}
                        onChange={e => props.changeData(props.parent, e.target.checked, e.target.name)}
                        checked={Boolean(props.data.delivery)}/>}
                    label={<span className={'font-weight-light'}>{Loc.app.have_delivery_delivery}</span>}
                    labelPlacement={'start'}
                />
            </div>

            <div className="col-12 mb-4">
                <TextField
                    onChange={e => props.changeData(props.parent, e.target.value, e.target.name)}
                    className={'w-100 font-weight-light'}
                    size={form.size}
                    multiline
                    rows={6}
                    variant="outlined"
                    value={props.data.description}
                    name={'description'}
                    label={Loc.app.place_handler.description}
                />
            </div>

        </div>
    )

}





