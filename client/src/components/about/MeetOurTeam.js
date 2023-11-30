import React from "react";
import { Box, Card, CardContent, CardHeader, Grid, Typography, makeStyles} from "@material-ui/core";

// const useStyles = makeStyles({
//     root: {
//       minWidth: 275,
//     },
//     bullet: {
//       display: "inline-block",
//       margin: "0 2px",
//       transform: "scale(0.8)",
//       fontSize: "24px"
//     },
//     linkCard: {
//       minHeight: "300px",
//       textAlign: "center"
//     },
//     supportCard: {
//       textAlign: "Left",
//       marginBottom: 12,
//       marginLeft: 12
//     },
//     centered: {
//         minWidth: 275,
//         textAlign: "center"
//       },
//     title: {
//       fontSize: "33px",
//       marginTop: 10
//     },
//     colorBackground: {
//         backgroundColor: "#c2d3f7"
//     }
//   });

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
                BioCompute is governed by an Executive Steering Committee, which engages in outreach and has executive oversight over the project, and a Technical Steering Committee, which builds tools and resources related to the IEEE-2791-2020 standard, and provides technical guidance to the community.
                </Typography>
                </Box>
            </CardContent>
        </Card>
);
}