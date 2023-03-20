// src/views/home/HomeView/BioComputeResorces.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import cloudlogo from "../../images/cloud.png"

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  centered: {
    minWidth: 275,
    textAlign: "center"
  },
  heightened: {
    minHeight: "250px"
  },
  title: {
    fontSize: "33px",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function BioComputeResources() {
  const classes = useStyles();

  return (
    <Card className={classes.centered} elevation={1}>
      <CardActionArea component={Link} to='/resources'>
        <CardContent className={classes.linkCard} >
          <Typography className={classes.title}>
            Cloud-based tools for BioCompute
            <br />
            <img src={cloudlogo} height={100} alt="cloud logo" />
            <br />
          </Typography>
          <Typography>
            See our resources page for additional tools and services.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
