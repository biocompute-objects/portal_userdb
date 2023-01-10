// src/components/resources/index.js

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";

import Tsc from "./Tsc.js";
import CGC from "./CGC.js";
import Packages from "./Packages";
import Builder from "./Builder";
import Galaxy from "./Galaxy";
import Hive from "./Hive";
import Citations from "./Citations";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  marginTopped: {
    marginTop: "50px"
  },
  whiteBackground: {
    backgroundColor: "#ffffff"
  }
}));

function DocView() {
  const classes = useStyles();

  return (
    <Paper>
      <Container maxWidth={false}>
        <Grid container justifyContent="space-around" spacing={3}>

          <Grid item xs={12} sm={6} lg={6} xl={6}>
            <Tsc />
          </Grid>
          <Grid item xs={12} sm={6} lg={6} xl={6}>
            <CGC />
          </Grid>

          <Grid classes={classes.colored} container justifyContent="space-around" spacing={3}>
            <Grid item lg={3} sm={6} xl={4} xs={12}>
              <Hive />
            </Grid>
            <Grid item lg={3} sm={6} xl={4} xs={12}>
              <Packages />
            </Grid>
            <Grid item lg={3} sm={6} xl={4} xs={12}>
              <Builder />
            </Grid>
            <Grid item lg={3} sm={6} xl={4} xs={12}>
              <Galaxy />
            </Grid>
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <Citations />
            </Grid>

          </Grid>

        </Grid>
      </Container>
    </Paper>
  );
}

export default DocView;
