import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";

export default function Intro() {

  return (
    <Card className="home-centered" elevation={0} >
      <Box className="home-colorBackground">
        <CardContent>
          <Typography className="home-intro-title">
          BioCompute: A platform for bioinformatics analysis workflow documentation
          </Typography>
          <Typography>
          BioCompute is shorthand for the IEEE 2791-2020 standard for bioinformatics analysis documentation to facilitate communication. This bioinformatics pipeline documentation approach has been adopted by a few FDA centers. The goal is to ease the communication burdens between research centers, organizations, and industries when describing bioinformatics workflows. This web portal allows users to explore and build BioCompute Objects that are both human and machine-readable.
          </Typography>
          
        </CardContent>
      </Box>
    </Card>
  );
}
