import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Root from './layouts/Root';
import {ApolloClient} from "apollo-client";
import { ApolloProvider } from '@apollo/client';
import {InMemoryCache} from "apollo-cache-inmemory"; 
import {setContext} from "apollo-link-context";
import {resolvers} from './store/resolvers';
import LocalStorage from '@localStorage';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {createUploadLink} from 'apollo-upload-client';
import {ApolloLink} from 'apollo-link';
 

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

const uploadLink = createUploadLink({
    uri: '/graphql',
    headers: {
        "keep-alive": "true"
    }
});

const cache = new InMemoryCache( );

const client = new ApolloClient({
    link: ApolloLink.from([authLink, uploadLink]),
    cache: cache,
    resolvers
});

cache.writeData({
    data: {
        isAuthorized: _.isString(localStorage.getItem(LocalStorage.token)),
        activeCity: Object.assign({__typename: 'City'}, _sharedData.cities[0]),
        activeCurrency: Object.assign({__typename: 'Currency'}, _sharedData.currencies[0]),
        meta: Object.assign({__typename: 'Meta'}, _sharedData.meta)
    }
});

const theme = createMuiTheme({
    typography: {
        fontWeight: 200,
        fontFamily: [
            'Relaway',
            'sans-serif'
        ].join(','),
    },
});

export default class App extends Component {

    render() {
        return (
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <Root/>
                </ThemeProvider>
            </ApolloProvider>
        );
    }

}

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}


