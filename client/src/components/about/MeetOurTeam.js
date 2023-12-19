import React from "react";
import { Box, Card, CardContent, Typography} from "@material-ui/core";

export default function Story() {

  return (
    <Card className="About-centerCard">
      <CardContent className="About-linkCard">
        <Box>
          <Typography className="About-title">
            <strong>Meet Our Team</strong>
            <br />
          </Typography>
          <Typography className="About-bullet">
            BioCompute is governed by an Executive Steering Committee, which engages in outreach and has
             executive oversight over the project, and a Technical Steering Committee, which builds tools
             and resources related to the IEEE-2791-2020 standard, and provides technical guidance to the
             community.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}