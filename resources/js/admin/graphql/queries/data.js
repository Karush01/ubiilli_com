import gql from 'graphql-tag';

export const GET_STATISTIC_DATA = gql`
    query getStatisticData{
        getStatisticData{
            placesCount
            usersCount
            reserves{
                successedReserves
                canceledReservers
                successedDeliveries
                canceledDeliveries
            }
            dynamic{
                y
                name
            }
        }
    }`;
