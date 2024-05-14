// src/components/resources/CGC.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@material-ui/core";

export default function CGC() {
  const logo = require("../../images/cgc.png");
  const cgcLink = "https://www.cancergenomicscloud.org/";

  return (
    <Card className="resources-root resources-supportcard"  elevation={5}>
      <CardActionArea onClick={() => global.window.open(cgcLink)}>
        <CardContent>
          <Typography className="resources-title">
            <img src={logo} height={36} alt="CGC logo" />
          </Typography>
          <Typography>
            The Cancer Genomics Cloud (CGC) has a powerful tool built into the
            CGC platform to capture and export a workflow as a BioCompute Object.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
