import gql from 'graphql-tag';

export const GET_OPTIONS = gql`
    {
        getOptions{
            id,
            description{
                name
            }
        }
    }`
