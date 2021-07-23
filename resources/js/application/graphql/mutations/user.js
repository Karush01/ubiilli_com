import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`mutation login(
    $email: String,
    $password: String
) {
    login(
        signin: {
            email: $email,
            password: $password
        }
    ) {
        user{
            id
            first_name
            last_name
            phone
            email
            user_type_id
        }
        message
        access_token
    }
}`;


export const UPDATE_INFORMATION = gql`mutation updateInformation(
    $first_name: String,
    $last_name: String,
    $phone: String,
    $email: String,

)
{updateInformation(
    update_info: {
        first_name: $first_name,
        last_name: $last_name,
        email: $email,
        phone: $phone,
    }
) {
    message
    status
    user{
        id
        first_name
        last_name
        phone
        email
        user_type_id
    }
}
}`;


export const CREATE_USER_MUTATION = gql`mutation createUser(
    $first_name: String,
    $last_name: String,
    $phone: String,
    $company_number: String,
    $email: String,
    $password: String,
    $google_token: String,
    $user_type: Int,
) {
    createUser(
        signup: {
            first_name: $first_name,
            last_name: $last_name,
            phone: $phone,
            company_number: $company_number,
            email: $email,
            password: $password,
            google_token: $google_token,
            user_type: $user_type
        }
    ) {
        user{
            id
            first_name
            last_name
            phone
            email
            user_type_id
        }
        access_token
        message
    }
}`;

export const UPDATE_PASSWORD = gql`mutation updatePassword(
    $old_password: String,
    $new_password: String
) {
    updatePassword( update_password:{
        old_password: $old_password,
        new_password: $new_password
    } ){
        message
        status
    }
}`;


export const CREATE_IBAN = gql`mutation createIban(
    $iban: String
) {
    createIban(
        iban: $iban
    ){
        message
        status
    }
}`;


export const SOCIAl_LOGIN_MUTATION = gql`mutation socialLogin(
    $provider: String,
    $token: String,
    $user_type: Int,
) {

    socialLogin(
        social: {
            provider: $provider,
            token: $token,
            user_type: $user_type
        }
    ) {
        user{
            id
            first_name
            last_name
            phone
            email
            user_type_id
        }
        access_token
        message
    }
}`;


export const PLACE_HANDLER_MUTATION = gql`mutation placeHandler(
    $place: PlaceInputData,
    $kitchens: [Int],
    $pictures: [PlacePicture],
    $options: [Int],
    $place_schedule: [PlaceScheduleInput],
) {
    placeHandler(
        place_data: {
            place: $place,
            kitchens: $kitchens,
            pictures: $pictures,
            options: $options,
            place_schedule: $place_schedule,
        }
    ) {
        message,
        status,
        slug
    }
}`;


export const PLACE_MENU_HANDLER_MUTATION = gql`mutation placeHandlerMenu(
    $menu_data: PlaceMenuData
) {
    placeHandlerMenu(
        menu_data: $menu_data
    ) {
        message,
        status
    }
}`;

export const PLACE_MENU_REMOVE_MUTATION = gql`mutation placeRemoveMenu(
    $menu_data: PlaceMenuData
) {
    placeRemoveMenu(
        menu_data: $menu_data
    ) {
        message,
        status
    }
}`;

export const LOGOUT_MUTATION = gql`mutation logout {
    logout {
        message,
        status
    }
}`;


export const SEND_ORDER_TO_KITCHEN_MUTATION = gql`mutation sendToKitchen
(
    $time: String!,
    $date: String!
) {
    sendToKitchen(
        active_order: {
            time: $time,
            date: $date
        }
    ) {
        message
    }
}`;





