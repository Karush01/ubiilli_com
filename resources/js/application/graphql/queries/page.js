import gql from 'graphql-tag';

export const GET_STATIC_PAGE = gql`
    query getStaticPageBySlug( $slug: String!) {
        getStaticPageBySlug ( slug: $slug) {
            slug
            title
            content
            meta{
                title
                keywords
                description
            }
        }
    }`
