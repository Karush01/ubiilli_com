import gql from 'graphql-tag';

export const CREATE_ORDER_MUTATION = gql`mutation createOrder(
    $name: String,
    $phone: String,
    $persons: Int,
    $place_id: Int!,
    $comment: String,
    $address: String,
    $time: String,
    $date: String,
    $delivery: Boolean!,
    $smokers: Boolean,
    $items: [Int!]
) {
    createOrder(
        order: {
            name: $name,
            phone: $phone,
            persons: $persons,
            place_id: $place_id,
            comment: $comment,
            address: $address,
            time: $time,
            date: $date,
            delivery: $delivery,
            smokers: $smokers,
            items: $items
        }
    ){
        status
        token
    }
}`;


export const CONFIRM_ORDER_MUTATION = gql`mutation confirmOrderStatus($id: Int!) {
    confirmOrderStatus(
        id: $id
    ) {
        message
    }
}`;


export const CANCEL_ORDER_MUTATION = gql`mutation cancelOrderStatus($id: Int!) {
    cancelOrderStatus(
        id: $id
    ) {
        message
    }
}`;

export const CHECK_PAYMENT = gql`mutation checkPayment(
    $sessionId: String,
) {
    checkPayment(
        sessionId: $sessionId
    ) {
        status
    }
}`


