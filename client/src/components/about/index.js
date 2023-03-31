import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Overview from "./Overview";
import leadspace from "../../images/leadspace.png";
import biocomputepic from "../../images/biocompute.png";
import timelineImg from  "../../images/timeline.png";
import Story from "./Story";
import cyclepic from "../../images/cycle.png";
import interoperabilitypic from "../../images/interoperability.png";
import domainspic from "../../images/domains.png";
import Bconexus from "./BCOnexus";
import SB from "./SB";

const About = () => {
  const OverviewCompo = {
    title: "Who we are",
    description: "A documentation interface for bioinformatics experiments workflow in a standardized human and machine-readable format. Improve and ease communication of HTS data and information between the research community, the clinical community, and regulatory organizations.",
    image: leadspace,
    imageText: "biocompute image"
  };

  return (
    <React.Fragment>
      <section>
        <Container maxWidth="xl">
          <img src={biocomputepic} alt="BCO logo" />
        </Container>
        <br>
        </br>
      </section>
      <section>
        <Overview post={OverviewCompo} />
      </section>
      {/* IEEE */}    
      <section>
        <Container maxWidth={false} > 
          <Grid container justifyContent="center" spacing={5}>
            <img src={timelineImg} />
          </Grid>
        </Container>
      </section>
      <section> 
        <Grid item xs={10} sm={12} lg={12} xl={12}>
          <Story />
        </Grid>
      </section> 
      {/* Our Goals Title */}
      <section>
        <Typography
          style={{ fontWeight: "150" }}
          component="h1"
          variant="h4"
          color="inherit"
          gutterBottom>
          <span style={{ fontWeight: "900" }}>Our Goals</span>
        </Typography>
      </section>
      <br></br>
      <br></br>
      <section>
        <Container maxWidth={false} > 
          <Grid container justifyContent="center" spacing={5}>
            <img src={cyclepic} />
            <br></br>
            <br></br>
            <br></br>
            <img src={interoperabilitypic} />
            <br></br>
            <br></br>
            <br></br>
            <img src={domainspic} />
          </Grid>
        </Container>
      </section>
      <br></br>
      <br></br>
      <br></br>
      <section>
        <Typography
          style={{ fontWeight: "150" }}
          component="h1"
          variant="h4"
          color="inherit"
          gutterBottom>
          <span style={{ fontWeight: "900" }}>Applications</span>
        </Typography>
      </section>
      <section>
        <Grid container justifyContent="space-around" spacing={3}>
          <Grid item lg={6} sm={6} xl={6} xs={12} >
            <Bconexus />
          </Grid>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <SB />
          </Grid>
        </Grid>
      </section>
      <br></br>
    </React.Fragment>
  );
};

export default About
