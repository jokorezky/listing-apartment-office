import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const QUERY = gql`
  query {
    places {
      id
      name
      description
      type
    }
  }
`;

const Home = () => (
  <Query query={QUERY}>
    {({ data, error, loading }) => {
      if (error) return '💩 Oops!';
      if (loading) return 'Patience young grasshopper...';
      console.log('this response', data);
      return (
        <React.Fragment>
          <h2>His/her friends:</h2>
        </React.Fragment>
      );
    }}
  </Query>
);

const App = () => <Home />;

export default App;
