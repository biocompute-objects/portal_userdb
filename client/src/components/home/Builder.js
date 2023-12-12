// src/views/home/HomeView/Builder.js

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
//   linkCard: {
//     minHeight: "300px",
//     minWidth: 275,
//     textAlign: "center"
//   },
//   title: {
//     fontSize: "33px",
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

export default function Builder() {
  // const classes = useStyles();

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
