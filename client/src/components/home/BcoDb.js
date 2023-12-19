// src/views/home/HomeView/BcoDb.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom"
import logo from "../../images/logo.png";

export default function BcoDb() {

  return (
    <Card className="home-linkcard" elevation={1}>
      <CardActionArea className="home-linkcard" component={Link} to='/bcodbs'>
        <CardContent>
          <Typography className="home-intro-title">
            BioCompute DB Search
            <br />
            <img src={logo} height={100} alt="BCO logo" />
            <br />
          </Typography>
          <Typography className="home-bullet">
            Search the BioCompute DB and view objects in the database.
            <br />
            The BCODB page allows searching and viewing BioCompute Objects from 
            any DB instance that a user has signed up for. The Public DB is accessable
            without an account or providing credentials. 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
