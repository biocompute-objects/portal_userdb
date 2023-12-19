// src/views/home/HomeView/Builder.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom"
import logo from "../../images/logo.png";

export default function Builder() {

  return (
    <Card className="home-linkcard" elevation={1}>
      <CardActionArea className="home-linkcard" component={Link} to='/builder'>
        <CardContent>
          <Typography className="home-intro-title">
            BioCompute Builder
            <br />
            <img src={logo} height={100} alt="BCO logo" />
            <br />
          </Typography>
          <Typography className="home-bullet">
            Use the BioCompute Builder or view objects in the database.
            <br />
            The BioCompute Builder is a platform-free, form-based editor. The
            builder walks a user through building a BCO through text boxes,
            indicating which entries are required to adhere to the IEEE standard.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
