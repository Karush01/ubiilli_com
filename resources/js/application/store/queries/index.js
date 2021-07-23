import {gql} from "apollo-boost";

export const GET_IS_AUTH = gql`
    query getIsAuthorized {
        isAuthorized @client
    }
`;

export const GET_ACTIVE_CITY = gql`
    query getActiveCity {
        activeCity @client{
            id
            name
        }
    }
`;


export const GET_ACTIVE_CURRENCY = gql`
    query getActiveCurrency {
        activeCurrency @client{
            label
        }
    }
`;

export const GET_META = gql`
    query getMeta{
        meta @client{
            title,
            keywords,
            description
        }
    }
`;



