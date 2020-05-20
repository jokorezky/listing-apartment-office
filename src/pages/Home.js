import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
);

const Home = ({ data: { loading, error, places } }) => {
  const classes = useStyles();
  console.log('this props', places);
  if (error) return '💩 Oops!';
  if (loading) return 'Loading...';
  return (
    <React.Fragment>
      <div className={classes.root}>
        <h2>His/her friends:</h2>
        <Button variant='contained'>Default</Button>
        <Button variant='contained' color='primary'>
          Primary
        </Button>
        <Button variant='contained' color='secondary'>
          Secondary
        </Button>
        <Button variant='contained' disabled>
          Disabled
        </Button>
      </div>
    </React.Fragment>
  );
};

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

export default graphql(QUERY)(Home);
