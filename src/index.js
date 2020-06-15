import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { setContext } from 'apollo-link-context';

import App from './App';

const httpLink = createHttpLink({ uri: 'https://api.github.com/graphql' });

const authLink = setContext((_, { headers }) => {

  const token = '2fbd4e06d66f0e56d41e1ce26fe4efad6bfa1368';

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    }
  }
});

const link = authLink.concat(httpLink);

const cliente = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={cliente}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
