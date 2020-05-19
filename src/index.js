import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import fetch from 'isomorphic-unfetch';
import { createHttpLink } from 'apollo-link-http';

const link = createHttpLink({
  uri: 'http://localhost:3000/api/v1/graphql',
  fetch: fetch,
});

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link,
  cache: new InMemoryCache(),
});

const AppWithProvider = () => (
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
);

ReactDOM.hydrate(<AppWithProvider />, document.getElementById('root'));
serviceWorker.unregister();
