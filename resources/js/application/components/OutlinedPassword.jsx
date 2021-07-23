import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Loc from '@loc';
import {form} from '@app';


export default (props) => {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <FormControl
            size={form.size}
            className={props.className}
            value={props.value}
            variant="outlined"
        >
            <InputLabel>{!_.isUndefined(props.title) ? props.title : Loc.app.password}</InputLabel>
            <OutlinedInput
                onChange={props.onChange}
                name={props.name}
                value={props.value}
                type={showPassword ? 'text' : 'password'}
                className={props.className}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            size={form.size}
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )

}





