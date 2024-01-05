// src/views/home/HomeView/FdaBox.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@material-ui/core";

export default function FdaBar() {
  const fdaLink = "https://www.federalregister.gov/documents/2020/07/22/2020-15771/electronic-submissions-data-standards-support-for-the-international-institute-of-electrical-and";

  return (
    <Card className="home-linkcard">
      <CardActionArea onClick={() => global.window.open(fdaLink)}>
        <CardContent className="home-linkcard">
          <Typography className="home-intro-title">
            FDA Notice on BioCompute
          </Typography>
          <Typography className="home-bullet">
            Electronic Submissions; Data Standards;
            Support for the International Institute of Electrical and Electronics Engineers Bioinformatics
            Computations and Analyses Standard for Bioinformatic Workflows.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
