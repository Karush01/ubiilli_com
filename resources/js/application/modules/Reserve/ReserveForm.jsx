import React from 'react';
import Loc from '@loc';
import SelectPersons from './SelectPersons';
import SelectDate from './SelectDate';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';

export default (props) => {

    return (
        <div className="row justify-content-center ">
            <SelectPersons
                setData={props.handleSetData}
                data={props.data}
                property={'persons'}
            />
            <SelectDate
                slug={props.place.getPlace.slug}
                setData={props.handleSetData}
                property={'date'}
                propertyTime={'time'}
                data={props.data}
                disabledToday={props.disabledToday}
            />

            <div className="col-12 pl-5 pr-5 ml-3 mr-3 mb-4">
                <div className=" w-100 d-block position-relative">{Loc.app.seat_zone}</div>

                <RadioGroup value={props.data.smokers == null ? "null" : props.data.smokers == true ? "true" : "false"}
                            onChange={props.handleRadioChange}>
                    <div className="row">
                        <div className="col-12 col-md-5 pr-0 mb-0">
                            <FormControlLabel
                                className={'mr-0'}
                                value="null"
                                control={<Radio/>}
                                label={Loc.app.no_matter}/>
                        </div>
                        <div className="col-12 col-md-3 pr-0 mb-0">
                            <FormControlLabel
                                className={'mr-0'}
                                value="true"
                                control={<Radio/>}
                                label={Loc.app.smokers}/>
                        </div>
                        <div className="col-12 col-md-4 pr-0 mb-0">
                            <FormControlLabel
                                className={'mr-0'}
                                value="false"
                                control={<Radio/>}
                                label={Loc.app.no_smokers}/>
                        </div>
                    </div>
                </RadioGroup>

            </div>

            <div className="col-12 col-md-5 mb-3">
                <Button
                    disabled={_.isNull(props.data.date) || _.isNull(props.data.time) || _.isNull(props.data.persons)}
                    variant="contained"
                    onClick={e => props.setCheckData(true)}
                    className={'w-100 primary'}>
                    {Loc.app.next}
                </Button>
            </div>
        </div>
    )

}





