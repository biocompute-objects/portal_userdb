// src/components/resources/DNAnexus.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core";

export default function dnanexus() {
  const dnanexuslogo = require("../../images/dnanexus.png");
  const dnanexusLink = "https://hub.docker.com/r/bcodocker/bconexus";

  return (
    <Card className="resources-supportcard resources-root" elevation={5}>
      <CardActionArea onClick={() => global.window.open(dnanexusLink)}>
        <CardContent>
          <Typography className="resources-title">
            <img src={dnanexuslogo} height={40} alt="DNAnexus logo" />
          </Typography>
          <Typography>
            BCOnexus developed by DNAnexus as a platform-free Docker tool for quick BCO evaluation.  
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
