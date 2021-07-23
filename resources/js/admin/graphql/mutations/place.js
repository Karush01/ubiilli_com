import gql from 'graphql-tag';

export const PLACE_STATUS_HANDLER = gql`mutation placeHandler(
    $id: Int!
    $status: Boolean!
) {
    placeStatusHandler(
        id: $id,
        status: $status
    ) {
        message
    }
}`;


export const PLACE_REMOVE_HANDLER = gql`mutation placeRemoveHandler(
    $id: Int!
) {
    placeRemoveHandler(
        id: $id
    ) {
        message
    }
}`;