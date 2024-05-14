// src/views/home/HomeView/Hive.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core";
import hive from "../../images/hive.png";
import aws from "../../images/powered-by-aws.png";

const hiveLink = "https://hive.aws.biochemistry.gwu.edu/dna.cgi?cmd=main";

export default function Hive() {

  return (
    <Card className="home-supportcard" elevation={0}>
      <CardActionArea onClick={() => window.open(hiveLink)}>
        <CardContent>
          <Typography className="home-intro-title">
            <img src={hive} height={65} alt="HIVE logo" />
            <br />
            <img src={aws} height={35} alt="AWS logo" />
          </Typography>
          <Typography className="home-bullet">
            Access AWS HIVE, the High-Performance Integrated Virtual Environment, on AWS.
            HIVE is a cloud-based environment optimized for the storage and analysis
            of extra-large data, such as biomedical data, clinical data,
            next-generation sequencing (NGS) data, mass spectrometry files, confocal
            microscopy images, post-market surveillance data, medical recall data,
            and many others.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}