import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Loc from '@loc';
import {form} from '@app';
import ButtonProgress from '@components/ButtonProgress';
import OutlinedPassword from '@components/OutlinedPassword';
import {CREATE_USER_MUTATION} from '@mutations/user';
import {useMutation} from "@apollo/client";
import useNotification from '@hooks/notificationHooks';
import PhoneField from "@containers/PhoneField";
import ReCAPTCHA from "react-google-recaptcha";


const initialState = {
    first_name: undefined,
    last_name: undefined,
    phone: undefined,
    email: undefined,
    password: undefined,
    company_number: undefined,
    google_token: undefined
};

export default (props) => {

    const [advanced, setAdvanced] = useState(false);

    const [createUser, {loading}] = useMutation(CREATE_USER_MUTATION);

    const {setErrorHandled} = useNotification();

    const [{first_name, last_name, email, phone, company_number, password, google_token}, setState] = useState(initialState);

    const clearState = () => {
        setState({...initialState})
    };

    const onChange = e => {
        const {name, value} = e.target;
        setState(prevState => ({...prevState, [name]: value}));
    };

    const signUp = async (e) => {

        await createUser({
            variables: {
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                company_number: company_number,
                email: email,
                password: password,
                google_token: google_token,
                user_type: props.userType
            }
        })
            .then(response => {

                const token = response && response.data && response.data.createUser && response.data.createUser.access_token;

                clearState();

                props.auth(token, response.data.createUser.user, response.data.createUser.message);


            }).catch(error => {
                setErrorHandled(error.graphQLErrors);
            });

    };

    const onChangeToken = (value) => {

        setState(prevState => ({...prevState, google_token: value}));

    };

    useEffect(() => {

        setAdvanced(props.userType == _sharedData.userTypes.manager);

    }, [props.userType]);

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-10">
                <div className="row">

                    <div className={"col-12 mb-4 " + (advanced ? ' col-md-6 ' : '')}>
                        <TextField
                            className={'w-100 font-weight-light'}
                            size={form.size}
                            variant="outlined"
                            value={_.isUndefined(first_name) ? '' : first_name}
                            name={'first_name'}
                            onChange={e => onChange(e)}
                            label={Loc.app.first_name}
                        />
                    </div>

                    {advanced &&
                    <div className={"col-12 mb-4 " + (advanced ? ' col-md-6 ' : '')}>
                        <TextField
                            className={'w-100 font-weight-light'}
                            size={form.size}
                            variant="outlined"
                            value={_.isUndefined(last_name) ? '' : last_name}
                            name={'last_name'}
                            onChange={e => onChange(e)}
                            label={Loc.app.last_name}
                        />
                    </div>
                    }
                    {advanced &&
                    <div className={"col-12 mb-4 " + (advanced ? ' col-md-6 ' : '')}>
                        <PhoneField
                            value={_.isUndefined(phone) ? '' : phone}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    }

                    <div className={"col-12 mb-4 " + (advanced ? ' col-md-6 ' : '')}>
                        <TextField
                            className={'w-100 font-weight-light'}
                            size={form.size}
                            value={_.isUndefined(email) ? '' : email}
                            name={'email'}
                            onChange={e => onChange(e)}
                            variant="outlined"
                            label={Loc.app.email}
                        />
                    </div>

                    {advanced &&
                    <div className={"col-12 mb-4 " + (advanced ? ' col-md-6 ' : '')}>
                        <TextField
                            className={'w-100 font-weight-light'}
                            size={form.size}
                            value={_.isUndefined(company_number) ? '' : company_number}
                            name={'company_number'}
                            type={'number'}
                            onChange={e => onChange(e)}
                            variant="outlined"
                            label={Loc.app.company_number}
                        />
                    </div>
                    }

                    <div className={"col-12 mb-4 " + (advanced ? ' col-md-6 ' : '')}>
                        <OutlinedPassword
                            name={'password'}
                            onChange={e => onChange(e)}
                            value={_.isUndefined(password) ? '' : password}
                            className={"w-100 mb-0"}
                        />

                        <div className="text-left">
                        <span className={'w-100 text-muted fon-weight-light small d-block line-small'}>
                            <small>{Loc.app.create_pass}</small>
                        </span>
                        </div>
                    </div>

                    <div className={"col-12 " + (advanced ? ' col-md-6 ' : '')}>
                        <ReCAPTCHA
                            style={{transform: 'scale(0.8)', transformOrigin: '0 0'}}
                            sitekey={_sharedData.reCaptchaKey}
                            onChange={onChangeToken}
                        />
                    </div>

                    <div className="col-12 mb-4">
                        <ButtonProgress
                            onClick={e => signUp(e)}
                            loading={loading}
                            title={Loc.app.signup}
                        />
                    </div>

                    <div className="col-12 mb-4 text-center">
                        <span
                            onClick={e => props.clickLink(props.modals.signin, e)}
                            className={'link'}>{Loc.app.i_have_acc}</span>
                    </div>
                </div>
            </div>
        </div>
    )

}
