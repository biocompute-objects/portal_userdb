// src/components/resources/Builder.js

import React from "react";
import {
  Card,
  CardActionArea,
  // CardActions,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core";

// Routing to pages
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  linkCard: {
    minHeight: "300px",
    textAlign: "center"
  },
  title: {
    fontSize: "33px",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Builder() {
  const classes = useStyles();
  const logo = require("../../images/logo.png");

  return (
    <Card className="resources-root resources-linkcard" elevation={2}>
      <CardActionArea className="resources-linkcard" component={RouterLink} to="/builder">
        <CardContent>
          <Typography className="resources-title">
            <img src={logo} height={100} alt="BCO logo" />
            <br />
            BioCompute Builder
          </Typography>
          <Typography>
            Use the BioCompute Builder or view objects in the database.
            <br />
            The BioCompute Builder is a platform-free, form-based editor.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
