// src/components/resources/Builder.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

export default function Builder() {
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
