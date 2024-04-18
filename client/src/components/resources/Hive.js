// src/components/resources/Hive.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@material-ui/core";

const hive = require("../../images/hive.png");
const aws = require("../../images/powered-by-aws.png");

const hiveLink = "https://hive.biochemistry.gwu.edu/dna.cgi?cmd=main";

export default function Hive() {

  return (
    <Card className="resources-supportcard resources-root" elevation={5}>
      <CardContent>
        <CardActionArea onClick={() => global.window.open(hiveLink)}>
          <Typography className="resources-title">
            <img src={hive} height={65} alt="HIVE logo" />
            <br />
            <img src={aws} height={35} alt="AWS logo" />
          </Typography>
          <Typography>
              The High-throughput Integrated Virtual Environment (HIVE) for
              genome analysis has platform specific tools for generating BioCompute Objects
              from workflows.
          </Typography>
        </CardActionArea>
      </CardContent>
    </Card>
  );
}
