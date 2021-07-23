import React, {useState} from 'react';
import {Button, Input, Spin} from 'antd';
import Loc from '@locAdmin';
import {UserOutlined, LockOutlined, LoginOutlined} from '@ant-design/icons';
import {LOGIN_MUTATION} from '@mutationsAdmin/user';
import {useMutation} from "@apollo/client";
import useNotification from '@hooksAdmin/notificationHooks';
import useAuthUser from '@hooksAdmin/useAuthUser';

export default (props) => {

    const size = 'large';

    const [login, {loading}] = useMutation(LOGIN_MUTATION);

    const [form, setForm] = useState({email: '', password: ''});

    const updateForm = (value, key) => {

        let newForm = {...form};

        newForm[key] = value;

        setForm(newForm)

    };

    const {setErrorHandled, successNotification} = useNotification();

    const {setAuthUser} = useAuthUser();

    const signIn = async (e) => {

        await login({variables: {email: form.email, password: form.password}})
            .then(response => {


                const token = response && response.data && response.data.login && response.data.login.access_token;

                setAuthUser(token);

                successNotification(response.data.login.message)


            }).catch(error => {
                setErrorHandled(error.graphQLErrors);
            });

    };

    return (
        <div className="container py-5 h-100">
            <div className="row h-100">
                <div className="col-12 col-md-4 m-auto">
                    <div className="card p-0">
                        <Spin spinning={(props.check === true) ? true : false}>
                            <div className="card-header">
                                <h3 className="mb-0 text-center">{Loc.admin.auth}</h3>
                            </div>
                            <div className="card-body mt-3">
                                <form className="form" autoComplete="off" noValidate="" method="POST">
                                    <div className="form-group mb-4">
                                        <Input
                                            onChange={e => updateForm(e.target.value, e.target.name)}
                                            placeholder={Loc.admin.email}
                                            size={size}
                                            className={'w-100'}
                                            value={form.email}
                                            name={'email'}
                                            type={'email'}
                                            suffix={<UserOutlined/>}/>
                                    </div>
                                    <div className="form-group mb-4">
                                        <Input
                                            suffix={<LockOutlined/>}
                                            name={'password'}
                                            type={'password'}
                                            onChange={e => updateForm(e.target.value, e.target.name)}
                                            value={form.password}
                                            size={size}
                                            placeholder={Loc.admin.password}/>
                                    </div>
                                    <Button
                                        icon={<LoginOutlined/>}
                                        onClick={e => signIn(e)}
                                        type="primary"
                                        size={size}
                                        className="w-100 text-uppercase">{Loc.admin.login}</Button>
                                </form>
                            </div>
                        </Spin>
                    </div>
                </div>
            </div>
        </div>
    )

}





