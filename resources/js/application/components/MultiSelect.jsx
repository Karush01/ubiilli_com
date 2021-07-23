import React, {useState, useEffect} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {form} from '@app';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';


const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;


export default (props) => {

    const [selectedData, setSelectedData] = useState([]);


    useEffect(() => {

        let result = [];

        _.map(props.data, (item, index) => {

            if (props.values.includes(parseInt(item.id)))
                result.push(item);

        });


        setSelectedData(result);

    }, [props.data, props.values]);


    const changeValue = (e, values) => {

        //знайдемо id всіх опцій і сформуємо массив

        let result = [];

        values.map((item, index) => {
            result.push(parseInt(item.id));
        });

        setSelectedData(values);

        props.onChange(props.name, result);


    }

    return (
        <Autocomplete
            multiple
            size={form.size}
            options={props.data}
            disableCloseOnSelect
            className={'w-100'}
            limitTags={2}
            value={selectedData}
            loading={props.loading}
            onChange={(e, value) => changeValue(e, value)}
            getOptionLabel={(item) => item.description.name}
            renderOption={(item, {selected}) => (
                <React.Fragment>
                    <Checkbox
                        className={'text-body'}
                        icon={icon}
                        checkedIcon={checkedIcon}
                        checked={selected}
                    />
                    {item.description.name}
                </React.Fragment>
            )}
            renderInput={(params) => (
                <TextField {...params}
                           variant="outlined"
                           label={props.label}
                           placeholder={props.subLabel}/>
            )}/>

    )

}





