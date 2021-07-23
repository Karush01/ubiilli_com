import {gql} from "apollo-boost";

export const GET_IS_AUTH = gql`
    query getIsAuthorized {
        isAuthorized @client
    }
`;

export const GET_ACTIVE_CURRENCY = gql`
    query getActiveCurrency {
        activeCurrency @client{
            code
        }
    }
`;
