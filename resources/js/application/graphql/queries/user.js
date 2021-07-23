import gql from 'graphql-tag';

export const CHECK_ACCOUNT = gql`
    query checkAccount{
        checkAccount
    }`;

export const GET_ACCOUNT_ORDERS_HISTORY = gql`query getOrdersHistory( $delivery: Boolean!) {
    getOrdersHistory(
        delivery: $delivery
    ) {
        id
        name
        phone
        reserveDate
        delivery
        persons
        date
        time
        address
        comment
        smokers
        paid
        confirmed
        items{
            id
            name
            price
            quantity
        }
        place{
            name
        }
    }
}`;

export const GET_ACCOUNT_PLACE_ORDERS_HISTORY = gql`query getPlaceOrdersHistory( $skip: Int, $delivery: Boolean, $active: Boolean) {
    getPlaceOrdersHistory (
        skip: $skip,
        delivery: $delivery,
        active: $active
    ){
        id
        name
        phone
        reserveDate
        delivery
        persons
        date
        time
        address
        comment
        smokers
        paid
        confirmed
        items{
            id
            name
            price
            quantity
        }
        place{
            name
        }
    }
}`;

export const GET_ACCOUNT_ACTIVE_ORDER = gql`query getActiveOrder
(
    $time: String!,
    $date: String!
) {
    getActiveOrder(
        active_order: {
            time: $time,
            date: $date
        }
    ) {
        place{
            name
        }
        items{
            name
            price
            quantity
        }
    }
}`;

export const GET_USER_PLACES = gql`
    query getUserPlaces{
        getUserPlaces{
            id,
            name,
            slug
        }
    }`;

export const GET_USER_BALANCE = gql`
    query getBalance{
        getBalance{
            amount
            withdraw
            iban
        }
    }`;
