// src/views/home/HomeView/BcoDb.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom"
import logo from "../../images/logo.png";

// const useStyles = makeStyles({
//   bullet: {
//     display: "inline-block",
//     margin: "0 2px",
//     transform: "scale(0.8)",
//   },
//   title: {
//     fontSize: "33px",
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

export default function BcoDb() {
  // const classes = useStyles();

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
