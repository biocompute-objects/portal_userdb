// src/components/resources/DNAnexus.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  linkCard: {
    minHeight: "300px",
    textAlign: "center"
  },
  supportCard: {
    textAlign: "center",
    marginBottom: 12
  },
  title: {
    fontSize: "33px",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function dnanexus() {
  const classes = useStyles();
  const dnanexuslogo = require("../../images/dnanexus.png");
  const dnanexusLink = "https://hub.docker.com/r/bcodocker/bconexus";

  return (
    <Card className={`${classes.root} ${classes.supportCard}`} elevation={5}>
      <CardActionArea onClick={() => window.open(dnanexusLink)}>
        <CardContent>
          <Typography className={classes.title}>
            <img src={dnanexuslogo} height={40} alt="DNAnexus logo" />
          </Typography>
          <Typography>
            BCOnexus developed by DNAnexus as a platform-free Docker tool for quick BCO evaluation.  
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
