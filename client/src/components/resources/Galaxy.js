// src/components/resources/Galaxy.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@material-ui/core";

export default function Galaxy() {

  const hive = require("../../images/galaxy.png");
  const aws = require("../../images/powered-by-aws.png");
  const galaxyLink = ("https://usegalaxy.org/");

  return (
    <Card className="resources-supportcard resources-root" elevation={5}>
      <CardContent>
        <CardActionArea onClick={() => global.window.open(galaxyLink)}>
          <Typography className="resources-title">
            <img src={hive} height={65} alt="Galaxy logo" />
            <br />
            <img src={aws} height={35} alt="AWS logo" />
          </Typography>
          <Typography>
              The Galaxy BCO API Extension enables Galaxy users to the export of
              Galaxy “workflow invocations” (i.e. realizations of a computational pipeline) in
              BCO format.
          </Typography>
        </CardActionArea>
      </CardContent>
    </Card>
  );
}
