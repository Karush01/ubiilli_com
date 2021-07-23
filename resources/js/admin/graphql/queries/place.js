import gql from 'graphql-tag';

export const GET_PLACES_LIST = gql`
    query getPlacesList( $request: InputSearch) {
        getPlacesList ( request: $request) {
            itemsCount{
                total,
                currentPage
                itemsCount
            }
            items{
                id
                name
                slug
                status
                hashedUrl
                user{
                    id
                    first_name
                    last_name
                }
                picture{
                    place_medium_picture
                }
            }
        }
    }`;
