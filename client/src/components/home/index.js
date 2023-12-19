// src

import React from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import Docs from "./Documentation";
import Workshop from "./Workshop";
// import Tsc from "./Tsc";
// import Galaxy from "./Galaxy";
import BcoDb from "./BcoDb"
import BioComputeResources from "./BioComputeResources";
// import Hive from "./Hive";
import Builder from "./Builder";
import FdaBox from "./FdaBox";
import NewsBar from "./NewsBar";
import Specification from "./Specification";
import Intro from "./Intro"

const HomePage = () => {

  return (
    <Container className="home-root">
      <Container maxWidth={false}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={9} lg={9} xl={9} >
            <Container className="home-margintop" maxWidth={false}>
              <Box>
                <Grid container justifyContent="space-around" spacing={3}>
                  <Grid item lg={12} sm={12} xl={12} xs={12}>
                    <Intro />
                  </Grid>
                  <Grid item lg={4} sm={6} xl={4} xs={12}>
                    <BcoDb />
                  </Grid>
                  <Grid item lg={4} sm={6} xl={4} xs={12}>
                    <Builder />
                    {/* <Galaxy /> */}
                  </Grid>
                  <Grid item lg={4} sm={6} xl={4} xs={12}>
                    <Docs />
                  </Grid>
                </Grid>
              </Box>
            </Container>
            <Container maxWidth={false}>
              <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={12} sm={12} lg={4} xl={4}>
                  <Specification />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={4}>
                  <BioComputeResources />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={4}>
                  <Workshop />
                </Grid>
              </Grid>
            </Container>
          </Grid>
          <Grid item xs={false} sm={4} lg={3} xl={2}>
            <Box className="home-margintop">
              <Typography align="center" variant={"h3"}>
                News and Events
              </Typography>
              <FdaBox />
              <br />
              <NewsBar />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Container>
  )
}

export default HomePage