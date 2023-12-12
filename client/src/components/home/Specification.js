// src/views/home/HomeView/Specification.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core";
import ieee from "../../images/ieee.jpg";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  linkCard: {
    minHeight: "300px",
    minWidth: 275,
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

export default function Specification() {
  const classes = useStyles();
  const ieeeLink = "https://standards.ieee.org/standard/2791-2020.html";

  return (
    <Card className="home-linkcard" elevation={1}>
      <CardActionArea onClick={() => window.open(ieeeLink)}>
        <CardContent className="home-linkcard">
          <Typography className="home-intro-title">
            IEEE 2791-2020
          </Typography>
          <Typography className="home-bullet">
            <img src={ieee} width={150} alt="IEEE logo" />
            <br />
            <br />
            IEEE Standard for Bioinformatics Analyses
            Generated by High-Throughput Sequencing (HTS) to Facilitate Communication
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
