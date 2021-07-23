import React, {useState, useEffect} from 'react';
import Title from '../Title';
import BlockHeader from '../BlockHeader';
import Loc from '@loc';
import {form} from '@app';
import TextField from '@material-ui/core/TextField';
import ButtonProgress from '@components/ButtonProgress';
import {UPDATE_INFORMATION, UPDATE_PASSWORD} from '@mutations/user';
import {useMutation} from "@apollo/client";
import useNotification from '@hooks/notificationHooks';
import LocalStorage from '@localStorage';
import {writeStorage} from '@rehooks/local-storage';
import OutlinedPassword from '@components/OutlinedPassword';

const passwordInitialState = {old_password: '', new_password: ''};

export default (props) => {

    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
    });

    const [passwordData, setPassword] = useState(passwordInitialState);

    const changePassword = (e) => {

        const pwd = {...passwordData};

        pwd[e.target.name] = e.target.value;

        setPassword(pwd);
    }

    const updateData = (value, key) => {

        const newData = {...data};

        newData[key] = value;

        setData(newData);
    }

    useEffect(() => {

        const newData = {...data};

        newData.first_name = props.user.first_name;
        newData.last_name = props.user.last_name;
        newData.email = props.user.email;
        newData.phone = _.isNull(props.user.phone) ? undefined : props.user.phone;

        setData(newData);

    }, [props.user]);

    const [updateInformation, {loading}] = useMutation(UPDATE_INFORMATION);

    const [updatePassword, {loading: passwordLoading}] = useMutation(UPDATE_PASSWORD);

    const {setErrorHandled, successNotification} = useNotification();

    const updateInfo = async (e) => {

        await updateInformation({variables: data})
            .then(response => {

                successNotification(response.data.updateInformation.message);

                writeStorage(LocalStorage.user, response.data.updateInformation.user);

            }).catch(error => {
                setErrorHandled(error.graphQLErrors);
            });

    }

    const updatePasswordInfo = async (e) => {

        await updatePassword({variables: passwordData})
            .then(response => {

                successNotification(response.data.updatePassword.message);

                //очистимо форму для паролів

                setPassword(passwordInitialState)

            }).catch(error => {
                setErrorHandled(error.graphQLErrors);
            });
    }

    return (
        <div className={'row scrolled-block  pb-5'}>
            <Title
                title={Loc.app.my_account}
                subtitle={Loc.app.my_account_desc}
            />

            <div className={'col-12'}>
                <div className="row">

                    <div className="col-12">
                        <BlockHeader header={Loc.app.main_info}/>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 col-md-6 mb-4 mb-md-5">
                                <TextField
                                    className={'w-100 font-weight-light'}
                                    size={form.size}
                                    variant="outlined"
                                    value={data.first_name}
                                    name={'first_name'}
                                    onChange={e => updateData(e.target.value, e.target.name)}
                                    label={Loc.app.first_name}
                                />
                            </div>

                            <div className="col-12 col-md-6 mb-4 mb-md-5">
                                <TextField
                                    className={'w-100 font-weight-light'}
                                    size={form.size}
                                    variant="outlined"
                                    value={data.last_name}
                                    name={'last_name'}
                                    onChange={e => updateData(e.target.value, e.target.name)}
                                    label={Loc.app.last_name}
                                />
                            </div>
                            <div className="col-12 col-md-6  mb-4 mb-md-5">
                                <TextField
                                    className={'w-100 font-weight-light'}
                                    size={form.size}
                                    variant="outlined"
                                    value={data.email}
                                    name={'email'}
                                    onChange={e => updateData(e.target.value, e.target.name)}
                                    label={Loc.app.email}
                                />
                            </div>
                            <div className="col-12 col-md-6  mb-4 mb-md-5">
                                <TextField
                                    label={Loc.app.phone}
                                    className={'w-100 font-weight-light'}
                                    size={form.size}
                                    value={data.phone}
                                    variant="outlined"
                                    onChange={e => updateData(e.target.value, e.target.name)}
                                    name={'phone'}
                                    type={'number'}
                                    autoComplete={'off'}
                                />
                            </div>

                            <div className="col-12">
                                <div className="row justify-content-end">
                                    <div className="col-12 col-md-5 text-right">
                                        <ButtonProgress
                                            onClick={e => updateInfo(e)}
                                            loading={loading}
                                            title={Loc.app.save}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 mt-4">
                        <BlockHeader header={Loc.app.password}/>
                    </div>

                    <div className="col-12 col-md-6  mb-4 mb-md-5">

                        <OutlinedPassword
                            onChange={e => changePassword(e)}
                            name={'old_password'}
                            title={Loc.app.old_password}
                            value={passwordData.old_password}
                            className={"w-100"}
                        />
                    </div>

                    <div className="col-12 col-md-6  mb-4 mb-md-5">

                        <OutlinedPassword
                            onChange={e => changePassword(e)}
                            name={'new_password'}
                            title={Loc.app.new_password}
                            value={passwordData.new_password}
                            className={"w-100"}
                        />
                    </div>

                    <div className="col-12">
                        <div className="row justify-content-end">
                            <div className="col-12 col-md-5  text-right">
                                <ButtonProgress
                                    onClick={e => updatePasswordInfo(e)}
                                    loading={passwordLoading}
                                    title={Loc.app.update_password}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}





