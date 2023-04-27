import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography,
  Box
} from "@material-ui/core";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
    fontSize: "26px"
  },
  linkCard: {
    minHeight: "300px",
    minWidth: 275,
    textAlign: "center",
    backgroundColor:"#D8E9FD"
  },
  title: {
    fontSize: "33px",
    marginTop: 10
  },
  // colorBackground: {
  //   backgroundColor: "#D8EDF9"
// }
});

export default function BCOnexus() {
    const classes = useStyles();

    return (
        <Card className={classes.linkCard}>
            <CardContent className={classes.linkCard}>
            <Box>
                <Typography className={classes.title}>
                    <stong>Velsera</stong>
                </Typography>
                <Typography className={classes.bullet}>
                BCO fields can be directly pre-populated from workflows on Velsera. Including inputs, outputs, parameters, and etc. 
                </Typography>
            </Box>
            </CardContent>
        </Card>
    );
}