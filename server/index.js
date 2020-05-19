import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import fetch from 'isomorphic-unfetch';
import { createHttpLink } from 'apollo-link-http';

const PORT = process.env.PORT || 3006;
const app = express();

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

app.use(express.static('./build'));

app.get('/*', (req, res) => {
  const app = ReactDOMServer.renderToString(<AppWithProvider />);

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
