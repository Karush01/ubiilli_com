import React, {useState, useEffect} from 'react';
import ReserveForm from './ReserveForm';
import ReserveCheck from './ReserveCheck';
import {parseDate} from '@hooks/helperHooks';
import {reserve} from '@app';
import {CREATE_ORDER_MUTATION} from '@mutations/order';
import useNotification from '@hooks/notificationHooks';
import {useMutation} from "@apollo/client";
import {useLocalStorage} from '@rehooks/local-storage';
import LocalStorage from '@localStorage';
import useCart from '@hooks/useCart';
import {createStripeLink} from '@hooks/helperHooks';

const initialState = {
    persons: null,
    date: null,
    time: null,
    smokers: null,
    comment: '',
    address: '',
    name: '',
    phone: '',
    place_id: null,
    delivery: false
};

export default (props) => {

    const [localCartItems] = useLocalStorage(LocalStorage.cartItems);

    const notEmptyCart = !_.isUndefined(localCartItems) && localCartItems.hasOwnProperty(props.place.getPlace.id) && !_.isEmpty(localCartItems[props.place.getPlace.id]);

    const {setErrorHandled} = useNotification();

    const [user] = useLocalStorage(LocalStorage.user);

    const {removeAllPlaceItems, createStripeSession} = useCart();

    const [onlinePay, setOnlinePay] = useState(notEmptyCart ? true : false);

    //проініціалізуємо дані користувача, якщо такі є

    if (!_.isUndefined(user)) {
        initialState.name = user.first_name + ' ' + user.last_name;
        initialState.phone = user.phone;
    }

    //вставимо id ресторану
    initialState.place_id = props.place.getPlace.id;

    const [data, setData] = useState(initialState);

    const [disabledToday, setDisabledToday] = useState(false);

    const [checkData, setCheckData] = useState(false);

    const handleSetData = (value, key, resetKey = null) => {

        const newData = {...data};

        newData[key] = value;

        if (_.isString(resetKey))
            newData[resetKey] = initialState[resetKey];

        setData(newData);

    };

    const handleOnlinePay = (e) => {

        setOnlinePay(e.target.value === 'true' ? true : false);

    };

    const handleRadioChange = (e) => {

        handleSetData(e.target.value == 'true' ? true : e.target.value == 'false' ? false : null, 'smokers');

    };

    const [createOrder, {loading}] = useMutation(CREATE_ORDER_MUTATION);

    const sendForm = async () => {

        const newData = {...data};

        if (notEmptyCart)
            newData.items = localCartItems[props.place.getPlace.id];

        await createOrder({variables: newData})
            .then(response => {

                let token = response.data.createOrder.token;


                if (!_.isNull(token)) {

                    createStripeSession(token);

                    if (onlinePay)
                        createStripeLink(token);
                }


                if (!onlinePay)
                    props.setModal(reserve.success, token);


                //очистимо корзину
                removeAllPlaceItems(props.place.getPlace.id);

            }).catch(error => {
                setErrorHandled(error.graphQLErrors);
            });

    };

    useEffect(() => {

        const newData = {...data};

        if (props.type == reserve.reserve) {

            newData.persons = 2;
            let currentDate = new Date();

            if (parseInt(props.place.getPlace.todaySchedule.close.replace(':', '')) -
                parseInt(currentDate.getHours() + "" + (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes()) < 30
            ) {
                currentDate.setDate(currentDate.getDate() + 1);
                setDisabledToday(true)
            }

            newData.date = parseDate(currentDate);

        } else {
            newData.delivery = true;
        }

        setData(newData);

    }, []);


    if (checkData || props.type == reserve.order)
        return <ReserveCheck
            place={props.place}
            data={data}
            type={props.type}
            handleSetData={handleSetData}
            sendForm={sendForm}
            loading={loading}
            onlinePay={onlinePay}
            notEmptyCart={notEmptyCart}
            setOnlinePay={handleOnlinePay}
        />;

    return (
        <ReserveForm
            data={data}
            handleSetData={handleSetData}
            handleRadioChange={handleRadioChange}
            disabledToday={disabledToday}
            place={props.place}
            setCheckData={setCheckData}
        />
    )

}





