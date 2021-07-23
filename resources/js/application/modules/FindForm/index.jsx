import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Loc from '@loc';
import { Redirect } from 'react-router-dom';
import routes from '@routes';
import omitEmpty from "omit-empty";
import qs from 'qs';
import { useQuery } from "@apollo/client";
import { GET_ACTIVE_CITY } from "../../store/queries";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import { buttonProgress } from '@app';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    }
}));

const initialState = {
    cityId: null,
    q: undefined,
    geo: {
        latitude: null,
        longitude: null
    }
};

export default (props) => {

    const classes = useStyles();

    const { data: activeCityData } = useQuery(GET_ACTIVE_CITY);

    const newInit = Object.assign({ ...initialState }, { cityId: activeCityData.activeCity.id });

    const [params, setParams] = useState(newInit);

    const [findGeo, setFindGeo] = useState(false);

    const [redirect, setRedirect] = useState(null);

    const geo = 'geo';

    const cityId = 'cityId';

    const selectFields = (field, value) => {

        if (value == geo)
            getGeo();
        else
            setFilterParams(field, value, geo);

    };

    const setFilterParams = (field, value, resetField = null) => {

        if (_.isUndefined(props.params)) {

            let filters = { ...params };

            if (!_.isNull(resetField))
                filters[resetField] = { ...initialState }[resetField];

            filters[field] = value;

            setParams(filters);

        } else {
            props.changeFilter(field, value, resetField)
        }

    };

    const findPlaces = (e) => {

        if (_.isUndefined(props.params))
            setRedirect("/" + routes.search + "?" + decodeURIComponent(qs.stringify(omitEmpty(params))));
        else
            props.changeFilter('q', params.q, geo)


    };

    const getGeo = async () => {

        await setFindGeo(true);

        const position = await new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const geoLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude };

        setFilterParams(geo, geoLocation, cityId);

        setFindGeo(false);

    };

    const changeSearchField = (field, value) => {

        let filters = { ...params };

        filters[field] = value;

        setParams(filters);

    };

    const pressForm = (e) => {

        if (e.key == 'Enter')
            findPlaces();

    };

    useEffect(() => {

        if (!_.isUndefined(props.params) && !_.isUndefined(props.params.q) && props.params.q !== params.q) {
            changeSearchField('q', props.params.q);
        }

    }, [props.params]);

    if (redirect !== null)
        return <Redirect to={redirect} />;

    return (
        <div className="find-form">
            <Paper component="form" className={classes.root}>
                <IconButton
                    onClick={getGeo}
                    className={classes.iconButton}>
                    {findGeo ?
                        <CircularProgress
                            thickness={buttonProgress.thickness}
                            className={'icon-secondary'}
                            size={buttonProgress.size + 6} />
                        :
                        <LocationOnIcon className={'icon-secondary'} />
                    }
                </IconButton>
                <FormControl className={'select-input'}>
                    <Select
                        name={cityId}
                        className={'cityId-select'}
                        onChange={e => selectFields(e.target.name, e.target.value)}
                        value={!_.isUndefined(props.params) ? _.isNull(props.params.cityId) ? geo : props.params.cityId : _.isNull(params.cityId) ? geo : params.cityId}
                    >
                        <MenuItem
                            value={geo}>
                            <ListItemIcon className={'select-list-icon'}>
                                <LocationOnIcon className={'icon-secondary'} fontSize="small" />
                            </ListItemIcon>
                            <ListItemText className={'select-icon-list-item font-weight-bold'}
                                primary={Loc.app.near_me} />
                        </MenuItem>
                        <Divider />
                        {_sharedData.cities.map((item, index) => (
                            <MenuItem
                                key={index}
                                value={item.city_id}>
                                <ListItemIcon className={'select-list-icon'}>
                                    <LocationOnIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText className={'select-icon-list-item font-weight-light'}
                                    primary={item.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Divider className={classes.divider} orientation="vertical" />
                <InputBase
                    name={'q'}
                    autoComplete={'off'}
                    onKeyPress={e => pressForm(e)}
                    onChange={e => changeSearchField(e.target.name, e.target.value)}
                    value={!_.isUndefined(params.q) ? params.q : ''}
                    className={classes.input}
                    placeholder={Loc.app.find_your_rest}
                />
                <IconButton
                    onClick={findPlaces}
                    type="button" className={classes.iconButton}>
                    <SearchIcon className={'icon-secondary'} />
                </IconButton>
            </Paper>
        </div>
    )

}





