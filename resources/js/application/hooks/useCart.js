import LocalStorage from '@localStorage';
import {writeStorage, deleteFromStorage, useLocalStorage} from '@rehooks/local-storage';

const useCart = () => {

    const addItem = (placeId, id) => {

        let cartItems = JSON.parse(localStorage.getItem(LocalStorage.cartItems)) || {};

        //тепер перевіримо чи є id  ресторану в корзині
        if (!(placeId in cartItems))
            cartItems[placeId] = [];

        //тепер додамо id страви в обєкт
        cartItems[placeId].push(parseInt(id));

        //обновимо локальне сховище
        writeStorage(LocalStorage.cartItems, cartItems);

    };

    const getPlaceCartItems = (placeId) => {

        let cartItems = JSON.parse(localStorage.getItem(LocalStorage.cartItems)) || {};

        return (placeId in cartItems) ? cartItems[placeId] : [];

    };

    const findValues = (array, itemId) => {

        return _.filter(array, (o) => {

            if (o == parseInt(itemId))
                return o;

        });
    };

    const removeAllCartItem = (placeId, itemId) => {

        let cartItems = JSON.parse(localStorage.getItem(LocalStorage.cartItems)) || {};

        //тепер перевіримо чи є id  ресторану в корзині
        if (!(placeId in cartItems))
            cartItems[placeId] = [];


        cartItems[placeId] = cartItems[placeId].filter(item => item != itemId);

        writeStorage(LocalStorage.cartItems, cartItems);


    };

    const removeAllPlaceItems = (placeId) => {

        let cartItems = JSON.parse(localStorage.getItem(LocalStorage.cartItems)) || {};

        //тепер перевіримо чи є id  ресторану в корзині
        if ((placeId in cartItems))
            delete cartItems[placeId];

        writeStorage(LocalStorage.cartItems, cartItems);


    };

    const removeItem = (placeId, itemId) => {

        let cartItems = JSON.parse(localStorage.getItem(LocalStorage.cartItems)) || {};

        //тепер перевіримо чи є id  ресторану в корзині
        if (!(placeId in cartItems))
            cartItems[placeId] = [];

        let counter = findValues(cartItems[placeId], itemId).length

        if (counter > 1) {

            const index = cartItems[placeId].indexOf(parseInt(itemId));

            if (index > -1)
                cartItems[placeId].splice(index, 1);

            writeStorage(LocalStorage.cartItems, cartItems);

        }

        return true;

    };

    const createStripeSession = (session) => {

        writeStorage(LocalStorage.stripeSession, session);
    };

    return {addItem, removeItem, removeAllCartItem, removeAllPlaceItems, createStripeSession};
};

export default useCart;
