import React from 'react';
import Loc from '@loc';
import TextField from '@material-ui/core/TextField';
import {form, reserve} from '@app';
import ButtonProgress from '@components/ButtonProgress';
import PhoneField from "@containers/PhoneField";
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';


export default (props) => {

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-11">
                <div
                    className="h6 font-weight-light w-100 small text-center">{props.type == reserve ? Loc.app.check_reserve : Loc.app.check_order}</div>
            </div>
            <div className="col-12 col-md-11 mt-2">
                <div className="row mb-3">
                    {props.type == reserve.order &&
                    <div className={"align-self-center col-12 col-md-6"}>
                        <div className="w-100">{Loc.app.delivery_from_rest}:</div>
                    </div>
                    }
                    <div
                        className={"col-12" + (props.type == reserve.order ? ' shadow-light  col-md-6  pt-2 pb-2 ' : '')}>
                        <div
                            className="h6 w-100 text-center font-weight-normal font-italic">
                            <span>{Loc.app.restauran}: {props.place.getPlace.name}</span>
                            <br/>
                            <small>{props.place.getPlace.address}, {props.place.getPlace.city.description.name}</small>
                        </div>
                    </div>
                </div>
            </div>
            {props.type == reserve.reserve &&
            <div className="col-12 col-md-11 mt-4 mb-4 d-flex justify-content-center">
                <div
                    className="tick-item text-center font-weight-bold pl-3 pr-3 pt-2 pb-2 d-inline-block ml-1 mr-1 ml-md-3 mr-md-3">
                    {props.data.persons} {Loc.app.pers}
                </div>
                <div
                    className="tick-item text-center font-weight-bold pl-3 pr-3 pt-2 pb-2 d-inline-block ml-1 mr-1 ml-md-3 mr-md-3">
                    {props.data.date}
                </div>
                <div
                    className="tick-item text-center font-weight-bold pl-3 pr-3 pt-2 pb-2 d-inline-block ml-1 mr-1 ml-md-3 mr-md-3">
                    {props.data.time}
                </div>
            </div>
            }

            <div className="col-12 pt-4 pb-4 shadow-light">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10">
                        <div className="row">
                            <div className="col-12 col-md-7 mb-2 mt-2 ">
                                <TextField
                                    label={Loc.app.for_whom}
                                    className={'w-100 font-weight-light'}
                                    size={form.size}
                                    value={props.data.name}
                                    variant="outlined"
                                    onChange={e => props.handleSetData(e.target.value, e.target.name)}
                                    name={'name'}
                                    autoComplete={'off'}
                                />
                            </div>
                            <div className="col-12 col-md-5  mb-2 mt-2">
                                <PhoneField
                                    value={props.data.phone}
                                    onChange={e => props.handleSetData(e.target.value, e.target.name)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-11 mt-4">
                <div
                    className="h6 font-weight-light w-100 text-center">{props.type == reserve.reserve ? Loc.app.special_request : Loc.app.reserve_address}</div>
            </div>

            <div className="col-12 col-md-10 mt-3">
                <TextField
                    className={'w-100 font-weight-light'}
                    size={form.size}
                    value={props.type == reserve.reserve ? props.data.comment : props.data.address}
                    variant="outlined"
                    placeholder={props.type == reserve.reserve ? Loc.app.reserve_comment : Loc.app.reserve_address_ex}
                    onChange={e => props.handleSetData(e.target.value, e.target.name)}
                    name={props.type == reserve.reserve ? 'comment' : 'address'}
                    autoComplete={'off'}
                />
            </div>

            {(props.notEmptyCart && ( props.type == reserve.reserve ) )&&
            <div className="col-12 col-md-10 mt-3">
                <RadioGroup
                    onChange={e => props.setOnlinePay(e)}
                    value={props.onlinePay == true ? "true" : "false"}>
                    <div className="row">
                        <div className="col-12 col-md-6 pr-0 mb-0">
                            <FormControlLabel
                                className={'mr-0'}
                                value="true"
                                control={<Radio/>}
                                label={Loc.app.pay_online}/>
                        </div>
                        <div className="col-12 col-md-6 pr-0 mb-0">
                            <FormControlLabel
                                className={'mr-0'}
                                value="false"
                                control={<Radio/>}
                                label={Loc.app.pay_offline}/>
                        </div>
                    </div>
                </RadioGroup>
            </div>
            }

            <div className="col-12 col-md-7 mt-4 mb-3">
                <ButtonProgress
                    onClick={e => props.sendForm(e)}
                    loading={props.loading}
                    title={props.type == reserve.reserve ? Loc.app.confirm_reserve : Loc.app.confirm_order}
                />
            </div>

        </div>
    )

}





