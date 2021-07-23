import React, {useEffect} from 'react';
import {GET_DAYS} from '@queries/day';
import {useQuery} from "@apollo/client";
import TextField from '@material-ui/core/TextField';
import IOSSwitch from "@components/IOSSwitch";
import Loc from '@loc';
import {form} from '@app';

export default (props) => {

    const {loading, error, data} = useQuery(GET_DAYS, {
        skip: (props.data.length > 0)
    });

    useEffect(() => {

        if (!_.isUndefined(data)) {

            let newData = [];

            data.getDays.map((item, index) => {
                newData.push({
                    name: item.description.name,
                    day_id: item.id,
                    open: undefined,
                    close: undefined,
                    active: true
                })
            });

            props.changeData(props.parent, newData)

        }

    }, [data]);

    const changeSchedule = (name, value, index) => {

        const newData = [...props.data];

        newData[index][name] = value;

        props.changeData(props.parent, newData);

    };

    return (
        <div className="row ml-0 mr-0">
            <div className="col-12 mt-4 mb-4">
                {props.data.map((item, index) => (
                    <div
                        key={index}
                        className="row mb-4">
                        <div className="col-12 col-md-5 align-self-center pl-1 pr-1">
                            <IOSSwitch
                                name={'active'}
                                onChange={e => changeSchedule(e.target.name, e.target.checked, index)}
                                checked={item.active}/>
                            <div className="h6 mb-0 font-weight-light d-inline-block ml-3">{item.name}</div>
                        </div>
                        <div className="col-6 col-md-3 pl-1 pr-1">
                            <TextField
                                className={'w-100'}
                                size={form.size}
                                label={Loc.app.time}
                                variant="outlined"
                                type={'time'}
                                name={'open'}
                                value={item.open}
                                onChange={e => changeSchedule(e.target.name, e.target.value, index)}
                            />
                        </div>
                        <div className="align-self-center col-2 col-md-1 d-md-block d-none text-center">
                            <div>-</div>
                        </div>
                        <div className="col-6 col-md-3 pl-1 pr-1">
                            <TextField
                                className={'w-100'}
                                size={form.size}
                                label={Loc.app.time}
                                variant="outlined"
                                type={'time'}
                                value={item.close}
                                name={'close'}
                                onChange={e => changeSchedule(e.target.name, e.target.value, index)}
                            />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )

}





