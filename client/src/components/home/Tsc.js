// src/views/home/HomeView/Tsc.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core";
// import { Link as RouterLink } from 'react-router-dom';

import logo from "../../images/logo.png";

export default function Tsc() {

  return (
    <Card className="home-linkcard" elevation={1}>
      <CardActionArea href='https://docs.google.com/document/d/1io5OBfsdEif_nWX-TmA22fz7gayHR1MsEwv2vI_QGBY' target="_blank">
        <CardContent className="home-linkcard">
          <Typography className="home-intro-title">
            <img src={logo} height={30} alt="BCO logo" />
            BCO TSC
          </Typography>
          <Typography className="home-bullet">
            The Technical Steering Committee of the BioCompute Partnership
            (TSC) is a body of experienced professionals with BioCompute standard subject
            matter expertise. See here for the Meeting notes and agenda for all past and
            the upcomming meetings.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
