import React, {useState} from 'react';
import DialogTitle from '@containers/DialogTitle';
import Transition from '@containers/Transition';
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Dialog from '@material-ui/core/Dialog';
import Loc from '@loc';
import DialogContent from '@material-ui/core/DialogContent';
import Cart from "./Cart";
import Reserve from "./Reserve";
import Success from "./Success";
import {useLocalStorage} from '@rehooks/local-storage';
import LocalStorage from '@localStorage';
import {reserve} from '@app';
import {GET_IS_AUTH} from "../../store/queries";
import {useQuery} from "@apollo/client";

export default (props) => {

    const {data: isAuth} = useQuery(GET_IS_AUTH);

    const [localCartItems] = useLocalStorage(LocalStorage.cartItems);

    const [modal, setModal] = React.useState(_.isUndefined(localCartItems) || !localCartItems.hasOwnProperty(props.place.getPlace.id) || _.isEmpty(localCartItems[props.place.getPlace.id]) ? reserve.reserve : reserve.cart);

    const theme = useTheme();

    const [maxWidth, setMaxWidth] = React.useState('sm');

    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const [payToken, setPayToken] = useState(null);

    const setCartModal = (type) => {

        if (isAuth.isAuthorized) {
            setModal(type);
        } else {
            props.handleClickClose();
            props.openAuth();
        }


    };

    const setModalType = (type, token = null) => {

        setModal(type);

        setPayToken(token);

    };

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClickClose}
            fullScreen={fullScreen}
            fullWidth={true}
            maxWidth={maxWidth}
        >
            <DialogTitle
                onClose={props.handleClickClose}
                id="alert-dialog-slide-title">{Loc.app.booking[modal]}</DialogTitle>

            <DialogContent className={'pt-4 pb-4 reserve-dialog'}>
                <div className="row justify-content-center ">
                    <div className="col-12">
                        {modal == reserve.cart ?
                            <Cart
                                setModal={setCartModal}
                                reserve={reserve.reserve}
                                placeId={props.place.getPlace.id}
                                delivery={props.place.getPlace.delivery}
                                type={props.type}
                            />
                            :
                            modal == reserve.success ?
                                <Success token={payToken}/>
                                :
                                <Reserve
                                    setModal={setModalType}
                                    type={modal}
                                    place={props.place}
                                />
                        }
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )

}





