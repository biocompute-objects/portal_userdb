import React from "react";
import {
  makeStyles,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core";
import PropTypes from "prop-types";
import leadspace from "../../images/leadspace.png";

const useStyles = makeStyles((theme) => ({
    Overview:{
        position: "relative",
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing (4),
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,.4)",
    },
    OverviewContent: {
        position: "relative",
        textAlign: "center",
        padding: theme.spacing(2),
        [theme.breakpoints.up("md")]: {
          padding: theme.spacing(3, 4),
          textAlign: "left",
        },
    },       
}));

export default function Overview(props) {
  const classes = useStyles();
  const {post} = props;

  return (
    <Paper
    className={classes.Overview}
    style={{ backgroundImage: `url(${leadspace})` }}>
    {
        <img
            style={{ display: "none" }}
            src={leadspace}
            alt="our mission background img"
        />
    }
    <div className={classes.overlay} />
    <Grid container>
        <Grid item sm={12} md={12}>
            <div className={classes.OverviewContent}>
                <Typography
                    style={{ fontWeight: "150" }}
                    component="h1"
                    variant="h4"
                    color="inherit"
                    gutterBottom>
                    Our <span style={{ fontWeight: "900" }}>Mission</span>
                </Typography>
                <br />
                <Typography component="h1" variant="h5" color="inherit" paragraph>
                    {post.description}
                </Typography>
            </div>
        </Grid>
    </Grid>
</Paper>
);
}

Overview.propTypes = {
    post: PropTypes.object,
};