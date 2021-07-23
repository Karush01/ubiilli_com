import gql from 'graphql-tag';

export const GET_PLACE_SCHEDULE = gql`
    query getPlace( $slug: String!, $date: String!) {
        getPlaceSchedule(slug :$slug, date: $date)
    }`

export const GET_PLACE_DISHES = gql`
    query getPlaceDishes($ids: [Int!]){
        getPlaceDishes(ids: $ids){
            id,
            name,
            price
        }
    }`

export const GET_RECOMMENDED_PLACES = gql` {
    getRecommendedPlaces{
        rating
        name
        slug
        picture{
            place_medium_picture
        }
        zip
        city{
            description{
                name
            }
        }
        placeType{
            description{
                name
            }
        }
    }
}`

export const GET_CITY_PLACES = gql`
    query getCityPlaces( $cityId: Int!) {
        getCityPlaces ( cityId: $cityId) {
            rating
            name
            slug
            picture{
                place_medium_picture
            }
            zip
            city{
                description{
                    name
                }
            }
            placeType{
                description{
                    name
                }
            }
        }
    }`

export const GET_SEARCH_PLACES = gql`
    query searchPlaces(
        $cityId: Int,
        $latitude: Float,
        $longitude: Float,
        $kitchens: [Int],
        $types: [Int],
        $options: [Int],
        $sort: String,
        $delivery: Boolean,
        $page: Int!
        $q: String
    ) {
        searchPlaces( request: {
            cityId: $cityId,
            kitchens: $kitchens,
            types: $types,
            options: $options,
            sort: $sort,
            delivery: $delivery,
            page: $page
            q: $q,
            geo: {
                latitude: $latitude
                longitude: $longitude
            }
        } ){
            itemsCount{
                currentPage
                itemsCount
                total
            }
            items{
                id
                name
                slug
                distance
                rating
                address
                middle_price
                city{
                    description{
                        name
                    }
                }
                todaySchedule{
                    open
                    close
                    active
                }
                placeKitchens{
                    kitchen{
                        description{
                            name
                        }
                    }
                }
                picture{
                    place_medium_picture
                }
            }
        }
    }`

export const GET_PLACE_BY_SLUG = gql`
    query getPlace( $slug: String!) {
        getPlace ( slug: $slug) {
            id
            slug
            name
            description
            phone
            rating
            tables_count
            tables_seats
            address
            type_id
            city_id
            picture_id
            zip
            latitude
            longitude
            delivery
            middle_price
            latitude
            longitude
            dishesFormatted{
                id
                name
                description
                price
                menuCategory{
                    id
                    description{
                        name
                    }
                }
            }
            todaySchedule{
                open
                close
                active
            }
            schedules{
                active
                open
                close
                day_id
                day{
                    description{
                        name
                    }
                }
            }
            city{
                description{
                    name
                }
            }
            placeOptions{
                option{
                    id
                    description{
                        name
                    }
                }
            }
            placeKitchens{
                kitchen{
                    id
                    description{
                        name
                    }
                }
            }
            pictures{
                picture{
                    id
                    place_huge_picture
                    place_large_picture
                    place_medium_picture
                }
            }
        }
    }`;


export const GET_PLACE_MENU = gql`
    query getPlace( $slug: String!) {
        getPlace ( slug: $slug) {
            id
            dishesFormatted{
                id
                name
                description
                price
                menuCategory{
                    id
                    description{
                        name
                    }
                }
            }
        }
    }`;
