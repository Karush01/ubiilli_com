import gql from 'graphql-tag';

export const GET_TYPES = gql`
    {
        getTypes{
            id
            description{
                name
            }
        }
    }`
