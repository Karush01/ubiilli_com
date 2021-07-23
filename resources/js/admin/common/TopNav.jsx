import React, {useState} from 'react';
import {Icon, Layout, Button, Avatar, Menu, Dropdown} from "antd";
import Loc from '@locAdmin';
import {MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined} from '@ant-design/icons';
import {LOGOUT_MUTATION} from '@mutationsAdmin/user';
import {useMutation} from "@apollo/client";
import useAuthUser from '@hooksAdmin/useAuthUser';
import useNotification from '@hooksAdmin/notificationHooks';

const {Header} = Layout;


export default (props) => {

    const [logout] = useMutation(LOGOUT_MUTATION);

    const {logOutUser, setAuthUser} = useAuthUser();

    const {setErrorHandled, successNotification} = useNotification();

    const handleClickLogout = async () => {

        let response = await logout()
            .then(response => {

                successNotification(response.data.logout.message);

                logOutUser();

            }).catch(error => {

                setErrorHandled(error.graphQLErrors);

            });

    }

    return (
        <Header style={{background: '#fff', padding: 0}}>
            <div className="col h-100">
                <div className="row  align-items-center h-100">
                    <div className="col-4">
                        {props.collapsed ?
                            <MenuUnfoldOutlined onClick={e => props.toggle(e)}/>
                            :
                            <MenuFoldOutlined onClick={e => props.toggle(e)}/>
                        }
                    </div>

                    <div className="col-8 text-right">
                        <Dropdown overlay={
                            <Menu>
                                <Menu.Item
                                    onClick={e => handleClickLogout(e)}
                                    key="1">{Loc.admin.logout}</Menu.Item>
                            </Menu>
                        } trigger={['click']}>
                            <UserOutlined/>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </Header>
    )

}





