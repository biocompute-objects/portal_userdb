// src/components/Home.js

import React from "react";
import { Container, Grid } from "@mui/material";
import FullWidthBox from "../components/FullWidthBox";
import ThirdBox from "../components/ThirdBox";
import logo from "../images/logo.png";
import ieee from "../images/ieee.jpg";
import workshoppic from "../images/workshop.jpg"
import mediaWiki from "../images/mediawikiwiki.svg";
import cloudlogo from "../images/cloud.png"

const HomePage = () => {
  return (
    <Container className="home-root">
      <Container maxWidth={false}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={12} lg={12} xl={12} >
            <Container className="home-margintop" maxWidth={false}>
              <FullWidthBox
                link="https://www.federalregister.gov/documents/2020/07/22/2020-15771/electronic-submissions-data-standards-support-for-the-international-institute-of-electrical-and"
                title="FDA Notice on BioCompute"
                content="Electronic Submissions; Data Standards;
                  Support for the International Institute of Electrical and Electronics Engineers Bioinformatics
                  Computations and Analyses Standard for Bioinformatic Workflows."
              />
              <br/>
              <FullWidthBox
                link=""
                title="BioCompute: A platform for bioinformatics analysis workflow documentation"
                content="BioCompute is shorthand for the IEEE 2791-2020 standard for Bioinformatics Analyses to facilitate communication. This pipeline documentation approach has been adopted by a few FDA centers (CBER, CDER and CFSAN). The goal is to ease the communication burdens between research centers, organizations, and industries. This web portal allows users to build a BioCompute Objects through the interface in a human and machine readable format."
                cssClass="home-colorBackground"
              />
              <br/>

              <Grid container justifyContent="space-around" spacing={3}>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <ThirdBox
                    link="/bcodbs"
                    title="BioCompute DB Search"
                    content="Search the BioCompute DB and view objects in the database.
                    
                    The BCODB page allows searching and viewing BioCompute Objects from 
                    any DB instance that a user has signed up for."
                    image={logo}
                    imageAlt="BCO logo"
                  />
                </Grid>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <ThirdBox
                    link="/builder"
                    title="BioCompute Builder"
                    image={logo}
                    content="Use the BioCompute Builder or view objects in the database.
                    The BioCompute Builder is a platform-free, form-based editor."
                  />
                </Grid>
                <Grid item lg={4} sm={6} xl={4} xs={12}>
                  <ThirdBox
                    link="https://standards.ieee.org/standard/2791-2020.html"
                    title="IEEE 2791-2020"
                    image={ieee}
                    content="BioCompute is an Official IEEE Standard for Bioinformatics Analyses
                    to Facilitate Communication. Open Source schema for the standard are stored on GitLab. "
                  />
                </Grid>
              </Grid>
            </Container>
            <br/>
            <Container maxWidth={false}>
              <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={12} sm={12} lg={12} xl={12} >
                  <FullWidthBox
                    link="https://wiki.biocomputeobject.org/index.php?title=BioCompute_Spring_Workshop_2024"
                    title="2024 BioCompute Conference & Workshop"
                    content="This workshop provides an opportunity to learn about interoperability between platforms that host BioCompute Objects (BCOs), the FDA’s 'Portal' for reading, writing and sharing BCOs, real world applications including intended use in regulatory submissions, and potential implementations, including the use of AI/ML. "
                    cssClass=""
                    image={workshoppic}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={4}>
                  <ThirdBox
                    link="https://wiki.biocomputeobject.org/index.php?title=Main_Page"
                    title="BioCompute Documentation"
                    content="The MediaWiki for the BioCompute Objects project. 
                    This wiki provides complementary information to the BioCompute portal."
                    cssClass=""
                    image={mediaWiki}
                  />
                </Grid>
                <Grid item xs={12} sm={12} lg={4} xl={4}>
                  <ThirdBox
                    link="https://hivelab.biochemistry.gwu.edu/publications#Multimedia"
                    title="Previous workshop material"
                    content="Collection of posters, presentation slides, and other materials from previous BioCompute workshops or conferences."
                    cssClass=""
                    image={workshoppic}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={4}>
                  <ThirdBox
                    link="/resources"
                    title="Cloud-based tools for BioCompute"
                    content="See our resources page for additional tools and services."
                    cssClass=""
                    image={cloudlogo}
                  />
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Container>
      <br/><br/>
    </Container>
  )
}

export default HomePage