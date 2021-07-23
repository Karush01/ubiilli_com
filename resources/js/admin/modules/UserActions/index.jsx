import React, {useState, useEffect} from 'react';
import {fetchingData} from '@appAdmin';
import {useQuery,useMutation} from "@apollo/client";
import {GET_USER_BY_ID} from '@queriesAdmin/user';
import SpinLoader from '@componentsAdmin/SpinLoader';
import PlacesData from '@modulesAdmin/PlacesData';
import Loc from '@locAdmin';
import {Button, Divider, Switch, Input, Statistic} from 'antd';
import {
    SaveOutlined,
    UserOutlined,
    PhoneOutlined,
    MailOutlined,
    LikeOutlined,
    CalendarOutlined,
    BankOutlined
} from '@ant-design/icons';
import useNotification from '@hooksAdmin/notificationHooks';
import {USER_HANDLER} from '@mutationsAdmin/user';


export default (props) => {

    const {setErrorHandled, successNotification} = useNotification();

    const {loading, error, data} = useQuery(GET_USER_BY_ID, {
        variables: {id: props.userId},
        fetchPolicy: fetchingData.noCache
    });

    const [user, setUser] = useState(undefined);

    const [userHandler, {loading: saveLoading}] = useMutation(USER_HANDLER);

    const changeField = (field, e, parent = null) => {

        if (_.isUndefined(e))
            e = null;

        if (_.isObject(e))
            e = e.target.value;

        let newUser = {...user};

        if (!_.isNull(parent))
            newUser[parent][field] = e;
        else
            newUser[field] = e;

        setUser(newUser);

    };

    const saveData = async () => {

        const sendData = (
            ({first_name, last_name, phone, email, active, iban}) => ({
                first_name,
                last_name,
                phone,
                email,
                active,
                iban
            }))(_.cloneDeep(user));

        await userHandler({
            variables: {
                id: user.id,
                user_data: sendData
            }
        }).then(response => {

            successNotification(response.data.userHandler.message)


        }).catch(error => {
            setErrorHandled(error.graphQLErrors);
        });
    };

    useEffect(() => {

        if (!_.isUndefined(data))
            setUser(data.getUserById);

    }, [data]);

    if (_.isUndefined(data) || _.isUndefined(props.userId) || _.isUndefined(user) || loading)
        return <SpinLoader/>;

    return (
        <div className="container-fluid mt-5 mb-5 pb-5 pl-0 pr-0">
            <div className="row">
                <div className="col-12 col-md-6 mb-4">
                    <Divider className={'mt-3 mb-3'}>{Loc.admin.personal_info}</Divider>
                    <div className="row mb-2">
                        <div className="col-12 col-md-6 mb-2">
                            <label>{Loc.admin.users.first_name}</label>
                            <Input
                                prefix={<UserOutlined/>}
                                onChange={e => changeField('first_name', e)}
                                className={'w-100'}
                                defaultValue={user.first_name}
                                placeholder={Loc.admin.users.first_name}
                            />
                        </div>
                        <div className="col-12 col-md-6 mb-2 ">
                            <label>{Loc.admin.users.last_name}</label>
                            <Input
                                prefix={<UserOutlined/>}
                                onChange={e => changeField('last_name', e)}
                                className={'w-100'}
                                defaultValue={user.last_name}
                                placeholder={Loc.admin.users.last_name}
                            />
                        </div>
                        <div className="col-12 col-md-6 mb-2">
                            <label>{Loc.admin.users.phone}</label>
                            <Input
                                prefix={<PhoneOutlined/>}
                                type={'number'}
                                onChange={e => changeField('phone', e)}
                                className={'w-100'}
                                defaultValue={user.phone}
                                placeholder={Loc.admin.users.phone}
                            />
                        </div>
                        <div className="col-12 col-md-6 mb-2">
                            <label>{Loc.admin.users.email}</label>
                            <Input
                                prefix={<MailOutlined/>}
                                name={''}
                                onChange={e => changeField('email', e)}
                                className={'w-100'}
                                defaultValue={user.email}
                                placeholder={Loc.admin.users.email}
                            />
                        </div>
                        {_.isObject(user.iban) &&
                        <div className="col-12 mb-2">
                            <label>{Loc.admin.users.iban}</label>
                            <Input
                                prefix={<BankOutlined/>}
                                name={''}
                                onChange={e => changeField('iban', e, 'iban')}
                                className={'w-100'}
                                defaultValue={user.iban.iban}
                                placeholder={Loc.admin.users.iban}
                                suffix={
                                    <Switch
                                        onChange={e => changeField('verified', !user.iban.verified, 'iban')}
                                        checked={user.iban.verified}
                                        size="small"
                                    />
                                }
                            />
                        </div>
                        }
                    </div>
                </div>
                <div className="col-12 col-md-6 mb-4">
                    <Divider className={'mt-3 mb-3'}>{Loc.admin.other_info}</Divider>
                    <div className="row mb-2">
                        <div className="col-12 col-md-6">
                            <Statistic
                                title={Loc.admin.success_orders}
                                value={user.success_orders_count}
                                prefix={<LikeOutlined/>}/>
                        </div>
                        <div className="col-12 col-md-6">
                            <Statistic
                                title={Loc.admin.register_date}
                                value={user.registerDate}
                                prefix={<CalendarOutlined/>}/>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="ant-statistic">
                                <div className="ant-statistic-title">{Loc.admin.status}</div>
                                <div className="ant-statistic-content">
                                    <Switch
                                        onChange={e => changeField('active', !user.active)}
                                        checked={user.active}
                                        size="small"
                                    />
                                    <span
                                        className={'ml-2 small'}>{user.active ? Loc.admin.statuses.active : Loc.admin.statuses.block}</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <Statistic
                                title={Loc.admin.user_type}
                                value={user.userType.name}
                                prefix={<UserOutlined/>}/>
                        </div>
                    </div>
                </div>
                {user.places.length > 0 &&
                <div className="col-12 mt-4">
                    <Divider className={'mt-2 mb-2'}>{Loc.admin.place_items}</Divider>
                    <PlacesData
                        places={user.places}
                    />
                </div>
                }
            </div>
            <div className={'drawer-footer'}>
                <Button
                    loading={saveLoading}
                    onClick={e => saveData()}
                    icon={<SaveOutlined/>}
                    type="primary">{Loc.admin.save_and_close}</Button>
            </div>
        </div>
    )

}





