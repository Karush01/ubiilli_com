import gql from 'graphql-tag';

export const SET_IS_AUTH = gql`
    mutation ($isAuthorized: Boolean!) {
        setAuth(isAuthorized: $isAuthorized) @client
    }
`;

