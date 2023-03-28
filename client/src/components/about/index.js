import React, {useState, useEffect} from "react";
import CssBaseline from "@material-ui/core";
import { Box, Container, Grid, Typography, makeStyles } from "@material-ui/core";
import Overview from "./Overview";
import { Helmet } from "react-helmet";
import { AbcOutlined } from "@mui/icons-material";
import leadspace from "../../images/leadspace.png";
import domain from "../../images/domains.png";
import HorizontalHeading from "./HorizontalHeading";
import biocomputepic from "../../images/biocompute.png";
import timelineImg from  "../../images/timeline.png";
import Story from "./Story";
import cyclepic from "../../images/cycle.png";
import interoperabilitypic from "../../images/interoperability.png";
import domainspic from "../../images/domains.png";
import Bconexus from "./BCOnexus";
import SB from "./SB";
// import MeetOurTeam from "./MeetOurTeam";
// import OurTeam from "./OurTeam";
// import cycle from "../../src/images/cycle.png";
// import domains from "../../images/domains.png";
// import timeline from "../../images/timeline.png";
// import interoperability from "../../images/interoperability.png";

// const useStyles = makeStyles((theme) => ({
//     root: {
//       backgroundColor: theme.palette.background.dark,
//       minHeight: "100%",
//       paddingBottom: theme.spacing(3),
//       paddingTop: theme.spacing(3)
//     },
//     marginTopped: {
//       marginTop: "50px"
//     },
//     whiteBackground: {
//       backgroundColor: "#ffffff"
//     }
//   }));


const About = () => {
    const OverviewCompo = {
        title: "Who we are",
        description: "A documentation interface for bioinformatics experiments workflow in a standardized human and machine-readable format. Improve and ease communication of HTS data and information between the research community, the clinical community, and regulatory organizations.",
        image: leadspace,
        imageText: "biocompute image"
    };
    const HeadBioCompute = {
        h2textTop: "About BioCompute"
    };
    const HeadIEEE ={
        h2textBottomStrongBefore: "Shorthand for the Institute of Electrical and Electronics Engineers Standards Association (IEEE 2791-2020)",
    };
    const HeadMyGoal = {
        h2textTop: "Our Goals"
    };


    return (
        <React.Fragment>
            <section>
                <Container maxWidth="xl">
                    {/* <Row className="content-box-md">
                        <Col>
                            <HorizontalHeading post={HeadBioCompute} />
                        </Col>
                        <Col md={"auto"} className="gg-align-middle gg-align-center">
                            <Col> */}
                                <img src={biocomputepic} alt="BCO logo" />
                            {/* </Col>
                        </Col>
                    </Row> */}
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
            {/* <section>
                <Grid item xs={10} sm={12} lg={12} xl={12}>
                    <MeetOurTeam />
                </Grid>
            </section> */}
            {/* <section>
                <OurTeam />
            </section> */}
        </React.Fragment>
        );
};

export default About
