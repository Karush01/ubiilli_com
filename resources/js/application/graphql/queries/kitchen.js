import gql from 'graphql-tag';

export const GET_KITCHENS = gql`
    {
        getKitchens{
            id,
            description{
                name
            }
        }
    }`
