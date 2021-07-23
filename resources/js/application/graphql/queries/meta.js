import gql from 'graphql-tag';

export const GET_META = gql`
    query getMetaTags( $slug: String!) {
        getMetaTags ( slug: $slug) {
            title
            description
            keywords
        }
    }`
