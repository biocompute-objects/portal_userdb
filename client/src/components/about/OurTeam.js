import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Image } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
// import TeamMembersData from "./TeamMembers";
// import TeamMembersCard from "./TeamMembersCard";
import TeamBgImg from "../../images/leadspace.png";


const useStyles = makeStyles((theme) => ({
  mainFeaturedCard: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: "white",
    backgroundSize: "cover",
    background: "no-repeat fixed center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    // backgroundColor: "rgba(94, 144, 186, 0.5)",
  },
  mainFeaturedCardContent: {
    position: "relative",
    textAlign: "center",
    padding: theme.spacing(6),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(8),
    },
  },
}));

const OurTeam = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {/* Team members image-background  */}
      <section>
        <Paper
          className={classes.mainFeaturedCard}
          style={{ backgroundImage: `url(${TeamBgImg})` }}
        >
          {<Image style={{ display: "none" }} src={TeamBgImg} alt="team background image" />}
          <div className={classes.overlay} />
          <Grid container>
            <Grid item sm={12} md={12}>
              <div className={classes.mainFeaturedCardContent}>
                <Typography
                  style={{ fontWeight: "200" }}
                  component="h1"
                  variant="h4"
                  color="inherit"
                  gutterBottom
                >
                  MEET OUR
                </Typography>
                <Typography
                  style={{ fontWeight: "200" }}
                  component="h1"
                  variant="h4"
                  color="inherit"
                  gutterBottom
                >
                  TALENTED <span style={{ fontWeight: "900" }}>TEAM</span>
                </Typography>
                <br />
                <Typography component="h1" variant="h5" color="inherit" paragraph>
                  Our innovative and experienced team dedicated their hard work to develop BioCompute Objects Portal
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </section>
    </React.Fragment>
  );
};
export default OurTeam;