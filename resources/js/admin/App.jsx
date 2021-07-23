import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Root from './layouts/Root';
import {ApolloClient} from "apollo-client";
import { ApolloProvider } from '@apollo/client';
import {InMemoryCache} from "apollo-cache-inmemory";
import {createHttpLink} from 'apollo-link-http';
import {setContext} from "apollo-link-context";
import {resolvers} from './store/resolvers';
import LocalStorage from '@localStorageAdmin';

const httpLink = createHttpLink({uri: '/graphql'});

const authLink = setContext((_, {headers}) => {

    const token = localStorage.getItem(LocalStorage.token);
    return {
        headers: {
            ...headers,
            Authorization: LocalStorage.token ? `Bearer ${token}` : "",
            'Content-Language': _sharedData.locale.code

        }
    }

});

const cache = new InMemoryCache({
    addTypename: false
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
    resolvers
});

cache.writeData({
    data: {
        isAuthorized: _.isString(localStorage.getItem(LocalStorage.token)),
        activeCurrency: Object.assign({__typename: 'Currency'}, _sharedData.currencies[0]),
    },
});


export default class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Root/>
            </ApolloProvider>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}


