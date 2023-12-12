// src/components/resources/index.js

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";

// import Tsc from "./Tsc.js";
import CGC from "./CGC.js";
import Packages from "./Packages";
// import Builder from "./Builder.js";
import Galaxy from "./Galaxy";
import Hive from "./Hive";
import Citations from "./Citations";
import Dnanexus from "./DNAnexus.js";

function DocView() {
  const classes = makeStyles();
  return (
    <Paper>
      <Container maxWidth={false}>
        <Grid container justifyContent="space-around" spacing={3}>

          <Grid item xs={12} sm={6} lg={6} xl={6}>
            <Dnanexus />
          </Grid>
          <Grid item xs={12} sm={6} lg={6} xl={6}>
            <CGC />
          </Grid>
        </Grid>
        <Grid classes={classes.colored} container alignItems="space-around" spacing={3}>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Hive />
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Packages />
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Galaxy />
          </Grid>
          {/* <Grid item lg={3} sm={6} xl={4} xs={12}>
                    <Tsc />
                  </Grid> */}
          <Grid item xs={12} sm={12} lg={12} xl={12}>
            <Citations />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

export default DocView;
