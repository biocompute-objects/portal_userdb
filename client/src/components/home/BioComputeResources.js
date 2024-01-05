// src/views/home/HomeView/BioComputeResorces.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom";
import cloudlogo from "../../images/cloud.png"

export default function BioComputeResources() {

  return (
    <Card className="home-centered" elevation={1}>
      <CardActionArea component={Link} to='/resources'>
        <CardContent className="home-linkcard" >
          <Typography className="home-intro-title">
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
