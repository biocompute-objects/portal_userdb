import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box
} from "@material-ui/core";

export default function BCOnexus() {

  return (
    <Card className="About-linkCard">
      <CardContent className="About-linkCard">
        <Box>
          <Typography className="About-title">
            <stong>Velsera</stong>
          </Typography>
          <Typography className="About-bullet">
                BCO fields can be directly pre-populated from workflows on Velsera. Including inputs, outputs, parameters, and etc. 
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}