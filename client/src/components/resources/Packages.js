// src/components/resources/Packages.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core";
import cranLogo from "../../images/cran.png";
import gitLogo from "../../images/Octocat.png";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  linkCard: {
    minHeight: "300px",
    textAlign: "center"
  },
  supportCard: {
    textAlign: "center",
    marginBottom: 12
  },
  title: {
    minWidth: 275,
    fontSize: "33px"
  },
  subtitle: {
    fontSize: "25px",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Packages() {
  const classes = useStyles();
  const bcotoolLink = "https://github.com/biocompute-objects/bcotool/tree/1.1.0";
  const cranBCOLink = "https://cran.r-project.org/web/packages/biocompute/index.html";

  return (
    <Card className="resources-supportcard resources-root" elevation={5}>
      <Typography className="resources-title">
        Software Packages
        <br />
      </Typography>
      <CardActionArea onClick={() => window.open(cranBCOLink)}>
        <CardContent>
          <Typography className="resources-subtitle">
            <img src={cranLogo} height={25} alt="CRAN logo" />
            CRAN biocompute
            <br />
          </Typography>
          <Typography className="resources-bullet">
            Tools to create, validate, and export BioCompute Objects
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActionArea onClick={() => window.open(bcotoolLink)}>
        <CardContent>
          <Typography className="resources-subtitle">
            <img src={gitLogo} height={25} alt="BCO logo" />
            BCO Tool
            <br />
          </Typography>
          <Typography className="resources-bullet">
            Command line tool to create, validate, and export BioCompute Objects
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
