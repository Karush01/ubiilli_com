import gql from 'graphql-tag';

export const GET_MENU_CATEGORIES = gql`
    {
        getMenuCategories{
            id
            description{
                name
            }
        }
    }`
