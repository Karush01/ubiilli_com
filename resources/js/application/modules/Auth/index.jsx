import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@containers/DialogTitle';
import Transition from '@containers/Transition';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Forgot from './Forgot';
import SocialSign from './SocialSign';
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Loc from '@loc';
import useAuthUser from '@hooks/useAuthUser';
import useNotification from '@hooks/notificationHooks';

export default (props) => {

    const modals = {signin: 'signin', signup: 'signup', forgot: 'forgot'};

    const [modal, setModal] = useState(modals.signin);

    const theme = useTheme();

    const [maxWidth, setMaxWidth] = React.useState('sm');

    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const clickLink = (modal) => {
        setModal(modal)
    };

    const {successNotification} = useNotification();

    const {setAuthUser} = useAuthUser();

    const auth = (token, user, message) => {

        setAuthUser(token, user);

        successNotification(message);

        props.handleClickClose();

    };

    useEffect(() => {

        if (props.userType == _sharedData.userTypes.manager)
            setModal(modals.signup);

    }, [props.userType]);


    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClickClose}
            fullScreen={fullScreen}
            maxWidth={maxWidth}
        >
            <DialogTitle
                onClose={props.handleClickClose}
                id="alert-dialog-slide-title">{Loc.app.auth[modal]}</DialogTitle>
            <DialogContent className={'auth-dialog pt-4 pb-4'}>
                <div className="row justify-content-center ">
                    <div
                        className={"col-12   " + (props.userType !== _sharedData.userTypes.manager ? 'col-md-7 form-divider' : ' col-md-12 ')}>
                        {modal == modals.signin ?
                            <SignIn
                                auth={auth}
                                modals={modals}
                                clickLink={clickLink}
                            />
                            :
                            modal == modals.signup ?
                                <SignUp
                                    userType={props.userType}
                                    auth={auth}
                                    modals={modals}
                                    clickLink={clickLink}

                                />
                                :
                                <Forgot
                                    modals={modals}
                                    clickLink={clickLink}
                                />
                        }
                        {props.userType !== _sharedData.userTypes.manager &&
                        <span className="d-none d-md-inline-block auth-modal__divider"> {Loc.app.or} </span>
                        }
                    </div>

                    {props.userType !== _sharedData.userTypes.manager &&
                    <div className="col-12 col-md-5 ">
                        <SocialSign
                            userType={props.userType}
                            auth={auth}
                        />
                    </div>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )

}





