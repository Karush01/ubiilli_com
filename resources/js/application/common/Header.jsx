import React, { useState, useEffect } from 'react';
import Logo from '@components/Logo';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Loc from "@loc";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_IS_AUTH } from '../store/queries';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Account from '@modules/Account';
import { CHECK_ACCOUNT } from '@queries/user';
import useAuthUser from '@hooks/useAuthUser';
import useNotification from '@hooks/notificationHooks';
import { useLocalStorage } from '@rehooks/local-storage';
import LocalStorage from '@localStorage';


export default (props) => {

    const { data } = useQuery(GET_IS_AUTH);

    const [accountMenu, setAccountMenu] = useState(false);

    const { logOutUser } = useAuthUser();

    const { setErrorHandled } = useNotification();

    const [checkAccount, { called, loading }] = useLazyQuery(CHECK_ACCOUNT, {
        onCompleted: (data) => {

        },
        onError: (error) => {

            setErrorHandled(error.graphQLErrors);
            logOutUser();

        }
    });

    useEffect(() => {

        if (data.isAuthorized)
            checkAccount();

    }, []);

    return (
        <header className={'position-relative'}>
            <div className="container pt-md-3 pb-md-3">
                <div className="row">
                    <div className="align-items-center col-6 d-flex text-left">
                        <Link className="navbar-brand" to="/">
                            <div className={"d-inline-block"}>
                                <Logo />
                            </div>
                        </Link>
                    </div>
                    <div className="align-items-center col-6 d-flex text-right">

                        {!data.isAuthorized ?
                            <Button
                                onClick={props.handleClickOpen}
                                startIcon={<PersonOutlineIcon />}

                                className={' my-2 my-sm-0 ml-auto'}>{Loc.app.signin}</Button>
                            :
                            <Button
                                onClick={e => setAccountMenu(!accountMenu)}
                                startIcon={<PersonOutlineIcon />}

                                className={' my-2 my-sm-0 ml-auto'}>{Loc.app.cabinet}</Button>
                        }
                    </div>
                </div>
            </div>

            <SwipeableDrawer
                anchor="right"
                className={"account-sidebar-menu"}
                open={accountMenu}
                onClose={e => setAccountMenu(false)}
                onOpen={e => setAccountMenu(true)}
            >
                <Account
                    onClose={setAccountMenu}
                />
            </SwipeableDrawer>

        </header>
    )

}





