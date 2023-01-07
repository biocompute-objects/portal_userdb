// src/components/resources/Galaxy.js

import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  linkCard: {
    minHeight: '250px',
    textAlign: 'center'
  },
  heightened: {
    minHeight: '250px'
  },
  title: {
    fontSize: '37px',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Galaxy() {
  const classes = useStyles();

  const hive = require('../../images/galaxy.png');
  const aws = require('../../images/powered-by-aws.png');
  const galaxyLink = ('http://galaxy.aws.biochemistry.gwu.edu/');

  return (
    <Card className={`${classes.root} ${classes.linkCard}`} elevation={2}>
        <CardContent>
          <CardActionArea onClick={() => window.open(galaxyLink)}>
            <Typography className={classes.title}>
              <img src={hive} height={65} alt="Galaxy logo" />
              <br />
              <img src={aws} height={35} alt="AWS logo" />
            </Typography>
            <Typography>
              The Galaxy BCO API Extension enables Galaxy users to the export of
              Galaxy “workflow invocations” (i.e. realizations of a computational pipeline) in
              BCO format.
            </Typography>
          </CardActionArea>
        </CardContent>
    </Card>
  );
}
