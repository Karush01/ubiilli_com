import gql from 'graphql-tag';

export const CHECK_ADMIN = gql`
    query checkAdmin{
        checkAdmin
    }`;

export const GET_USERS_LIST = gql`
    query getUsersList( $request: InputSearch) {
        getUsersList ( request: $request) {
            itemsCount{
                total
                currentPage
                itemsCount
            }
            items{
                id
                first_name
                last_name
                email
                registerDate
                active
            }
        }
    }`;


export const GET_USER_BY_ID = gql`
    query  getUserById($id: Int!) {
        getUserById(id: $id){
            id
            first_name
            last_name
            email
            phone
            active
            iban
            {
                id
                iban
                verified
            }
            userType
            {
                name
            }
            success_orders_count
            places
            {
                id
                name
                slug
                picture{
                    place_medium_picture
                }
                status
            }
            registerDate
        }
    }
`;
