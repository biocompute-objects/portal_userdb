import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core";
import workshoppic from "../../images/workshop.jpg"


// const useStyles = makeStyles({
//   bullet: {
//     display: "inline-block",
//     margin: "0 2px",
//     transform: "scale(0.8)",
//     fontSize: "22px"
//   },
//   linkCard: {
//     minHeight: "300px",
//     textAlign: "center"
//   },
//   supportCard: {
//     textAlign: "center",
//     marginBottom: 12,
//     minHeight: "300px",
//     minWidth: 275
//   },
//   title: {
//     minWidth: 275,
//     fontSize: "33px",
//     textAlign:"center"
//   },
//   subtitle: {
//     fontSize: "27px",
//   },
// });

export default function Workshop() {
  // const classes = useStyles();
  const PreworkshopLink = "https://hive.biochemistry.gwu.edu/publications#Multimedia";
  const UpcomingworkshopLink = "https://wiki.biocomputeobject.org/index.php?title=BioCompute_Spring_Workshop_2024";

  return (
    <Card className="home-linkcard" elevation={1}>
        <CardContent>
          <Typography className="home-intro-title">
            Workshop Resources
            <br />
            <br />
          </Typography>
          <CardActionArea onClick={() => global.window.open(UpcomingworkshopLink)}>
          <Typography className="home-subtitle">
            <img src={workshoppic} height={25} alt="Workshop logo" />
            Upcoming workshop
            <br />
          </Typography>
          </CardActionArea>
          <CardActionArea onClick={() => global.window.open(PreworkshopLink)}>
          <Typography className="home-subtitle" fontSize="20px">
            <br />
            <img src={workshoppic} height={25} alt="Workshop logo" />
            Previous workshop material
          </Typography>
          </CardActionArea>
        </CardContent>
        </Card>
  );
}
