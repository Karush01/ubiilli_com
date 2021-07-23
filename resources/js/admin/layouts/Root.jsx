import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import TopNav from '@commonAdmin/TopNav';
import Sidebar from "@commonAdmin/Sidebar";
import Footer from "@commonAdmin/Footer";
import routes from '@routesAdmin';
import { Layout } from 'antd';
import { GET_IS_AUTH } from '../store/queries';
import ContentIndex from '@pagesAdmin/ContentIndex';
import Places from '@pagesAdmin/Places';
import Users from '@pagesAdmin/Users';
import Auth from '@pagesAdmin/Auth';
import { useQuery, useLazyQuery } from "@apollo/client";
import { CHECK_ADMIN } from '@queriesAdmin/user';
import useAuthUser from '@hooksAdmin/useAuthUser';

const { Content } = Layout;

export default () => {

    const { logOutUser } = useAuthUser();

    const [collapsed, setCollapsed] = useState(false);

    const { data } = useQuery(GET_IS_AUTH);

    const toggle = () => {

        setCollapsed(!collapsed);

    };

    const [auth, setAuth] = useState(undefined);

    const [checkAdmin, { called, loading }] = useLazyQuery(CHECK_ADMIN, {
        onCompleted: (data) => {
            setAuth(data.checkAdmin)
        },
        onError: (error) => {
            logOutUser()
        }
    });

    useEffect(() => {

        checkAdmin();

    }, []);

    if (!data.isAuthorized)
        return <Auth />;


    if (loading)
        return <Auth check={loading} />;


    return (
        <BrowserRouter>
            <ScrollToTop>
                <div className="all-data  mh-100">
                    <Layout className={' mh-100 '}>
                        <Sidebar
                            collapsed={collapsed}
                        />
                        <Layout className="site-layout">
                            <TopNav
                                collapsed={collapsed}
                                toggle={toggle} />
                            <Content
                                className="site-layout-background"
                                style={{
                                    margin: '15px 0',
                                    minHeight: 500,
                                }}
                            >

                                <Switch>
                                    <Route path={'/' + routes.home} exact component={ContentIndex} />
                                    <Route path={'/' + routes.places.index} exact component={Places} />
                                    <Route path={'/' + routes.users.index + '/:id?'} exact component={Users} />
                                </Switch>
                            </Content>
                            <Footer />
                        </Layout>
                    </Layout>
                </div>
            </ScrollToTop>
        </BrowserRouter>
    )
}

