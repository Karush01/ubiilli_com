import gql from 'graphql-tag';

export const GET_DAYS = gql`
    {
        getDays{
            id,
            description{
                name
            }
        }
    }`
