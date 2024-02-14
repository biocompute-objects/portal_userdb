import React from "react";
import "../../App.css"
import {
  Card,
  CardContent,
  Typography,
  Box
} from "@material-ui/core";


export default function BCOnexus() {

  return (
    <Card className="About-linkCard">
      <CardContent className="About-inkCard">
        <Box>
          <Typography className="About-title">
            <stong>BCOnexus</stong>
          </Typography>
          <Typography className="About-bullet">
              Developed by DNAnexus
            <br>
            </br>
            <br></br>
            <li>Import workflows and applications metadata into BCO</li>
            <li>Export WDL and CWL scripts to DNAnexus workflows through dcCompiler</li>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}