import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Loc from '@loc';
import {form} from '@app';
import ButtonProgress from '@components/ButtonProgress';
import OutlinedPassword from '@components/OutlinedPassword';
import {LOGIN_MUTATION} from '@mutations/user';
import {useMutation} from "@apollo/client";
import useNotification from '@hooks/notificationHooks';

const initialState = {
    email: "",
    password: ""
};

export default (props) => {

    const [login, {loading}] = useMutation(LOGIN_MUTATION);

    const [{email, password}, setState] = useState(initialState);

    const {setErrorHandled} = useNotification();

    const clearState = () => {
        setState({...initialState})
    };

    const onChange = e => {
        const {name, value} = e.target;
        setState(prevState => ({...prevState, [name]: value}));
    };

    const signIn = async (e) => {

        await login({variables: {email: email, password: password}})
            .then(response => {

                const token = response && response.data && response.data.login && response.data.login.access_token;

                clearState();

                props.auth(token, response.data.login.user, response.data.login.message);

            }).catch(error => {
                setErrorHandled(error.graphQLErrors);
            });

    };


    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-10">
                <div className="row">
                    <div className="col-12 mb-4">
                        <TextField
                            className={'w-100 font-weight-light'}
                            size={form.size}
                            variant="outlined"
                            value={email}
                            name={'email'}
                            onChange={e => onChange(e)}
                            label={Loc.app.email}
                        />
                    </div>
                    <div className="col-12 mb-2">

                        <OutlinedPassword
                            onChange={e => onChange(e)}
                            value={password}
                            name={'password'}
                            className={"w-100"}
                        />

                    </div>

                    <div className="col-12 mb-3 text-right">
                        <span
                            onClick={e => props.clickLink(props.modals.forgot, e)}
                            className={'link small font-weight-light'}>{Loc.app.forg}</span>
                    </div>

                    <div className="col-12 mb-4">
                        <ButtonProgress
                            onClick={e => signIn(e)}
                            loading={loading}
                            title={Loc.app.login}
                        />
                    </div>

                    <div className="col-12 mb-4 text-center">
                        <span
                            onClick={e => props.clickLink(props.modals.signup, e)}
                            className={'link'}>{Loc.app.signup_first}</span>
                    </div>
                </div>
            </div>
        </div>
    )

}





