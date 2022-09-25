import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  spinner: {
    marginLeft: "50%",
    marginTop: "25%"
  },
}));

export default function Spinner() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CircularProgress className={classes.spinner} />
    </React.Fragment>
  );
}