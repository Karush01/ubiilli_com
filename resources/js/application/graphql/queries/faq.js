import gql from 'graphql-tag';

export const GET_FAQS = gql`{
    getFaqs{
        question
        answer
    }
}`
