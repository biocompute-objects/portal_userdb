// src/views/home/HomeView/Galaxy.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@material-ui/core";
import hive from "../../images/galaxy.png";
import aws from "../../images/powered-by-aws.png";

// const useStyles = makeStyles({
//   bullet: {
//     display: "inline-block",
//     margin: "0 2px",
//     transform: "scale(0.8)",
//   },
//   linkCard: {
//     minWidth: 275,
//     minHeight: "250px",
//     textAlign: "center"
//   },
//   heightened: {
//     minHeight: "250px"
//   },
//   title: {
//     fontSize: "37px",
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

export default function Other() {
  // const classes = useStyles();
  const galaxyLink = ("http://galaxy.aws.biochemistry.gwu.edu/");

  return (
    <Card className="home-linkcard" elevation={0}>
      <CardContent>
        <Typography className="home-intro-title">
          <img src={hive} height={65} alt="Galaxy logo" />
          <br />
          <img src={aws} height={35} alt="AWS logo" />
        </Typography>

        <Typography className="home-bullet">
            BioCompute has been merged into the main Galaxy repository. 
            This BioCompute enabled instance of Galaxy on AWS is therefore no longer operational. 
            Thank you to those that have participated in its development.
        </Typography>

      </CardContent>
    </Card>
  );
}
