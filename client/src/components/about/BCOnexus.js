import React from "react";
import '../../App.css';
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography,
  Box
} from "@material-ui/core";

// const useStyles = makeStyles({
//   bullet: {
//     display: "inline-block",
//     margin: "0 2px",
//     transform: "scale(0.8)",
//     fontSize: "26px"
//   },
//   linkCard: {
//     minHeight: "300px",
//     minWidth: 275,
//     textAlign: "center",
//     backgroundColor:"#D8E9FD"
//   },
//   title: {
//     fontSize: "33px",
//   },
// //   colorBackground: {
// //     backgroundColor: "#D8EDF9"
// // }
// });

export default function BCOnexus() {

    return (
        <Card className="About-BCOnexus-linkCard">
            <CardContent className="About-BCOnexus-linkCard">
            <Box>
                <Typography className="About-BCOnexus-title">
                    <stong>BCOnexus</stong>
                </Typography>
                <Typography className="About-BCOnexus-bullet">
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