import React, {useState} from 'react';
import {Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import Loc from '@locAdmin';
import routes from '@routesAdmin';
import {DashboardOutlined, EnvironmentOutlined, UserOutlined} from '@ant-design/icons';

const {Sider} = Layout;

export default (props) => {


    return (
        <Sider trigger={null} collapsible collapsed={props.collapsed}>
            <div className="logo"/>
            <Menu theme="dark" mode="inline" >
                <Menu.Item key="1">
                    <DashboardOutlined/>
                    <Link to={'/' + routes.home}>{Loc.admin.nav.dashboard}</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <UserOutlined/>
                    <Link to={'/' + routes.users.index}>{Loc.admin.nav.users}</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <EnvironmentOutlined/>
                    <Link to={'/' + routes.places.index}>{Loc.admin.nav.rests}</Link>
                </Menu.Item>
            </Menu>
        </Sider>

    )

}






