import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core";
import workshoppic from "../../images/workshop.jpg"


const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
    fontSize: "22px"
  },
  linkCard: {
    minHeight: "300px",
    textAlign: "center"
  },
  supportCard: {
    textAlign: "center",
    marginBottom: 12,
    minHeight: "300px",
    minWidth: 275
  },
  title: {
    minWidth: 275,
    fontSize: "33px",
    textAlign:"center"
  },
  subtitle: {
    fontSize: "27px",
  },
});

export default function Workshop() {
  const classes = useStyles();
  const workshopLink = "https://hive.biochemistry.gwu.edu/publications#Multimedia";

  return (
    <Card className={classes.supportCard} elevation={1}>
      <CardActionArea onClick={() => global.window.open(workshopLink)}>
        <CardContent>
          <Typography className={classes.title}>
            Workshop Resources
            <br />
          </Typography>
          <Typography className={classes.bullet}>
            <img src={workshoppic} height={105} alt="Workshop logo" />
            <br />
            Access previous workshop videos, slides and more
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
