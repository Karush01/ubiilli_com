import qs from 'qs';
import moment from 'moment';
import {datesFormat} from '@app';

export const filterObject = (string, params) => {

    const newParams = qs.parse(string.slice(1));


    for (let prop in newParams) {

        if (typeof params.hasOwnProperty(prop))
            params[prop] = newParams[prop];

    }


    return params;

};

export const formatKitchens = (array) => {

    let result = ' ';

    array.map((item, index) => {
        result += item.kitchen.description.name + ', ';
    })

    return result.slice(0, -2);

};

export const parseDate = (dd) => {

    return moment(dd).format(datesFormat.date);

};

export const createStripeLink = (token) => {

    let stripe = Stripe(_sharedData.stripeKey);

    return stripe.redirectToCheckout({sessionId: token});


};


