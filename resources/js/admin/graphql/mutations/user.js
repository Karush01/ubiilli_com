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
        access_token,
        message
    }
}`;


export const LOGOUT_MUTATION = gql`mutation logout {
    logout {
        message,
        status
    }
}`;

export const USER_HANDLER = gql`mutation userHandler(
    $id: Int!
    $user_data: UserData!
) {
    userHandler(
        id: $id,
        user_data: $user_data
    ) {
        message
    }
}`;






