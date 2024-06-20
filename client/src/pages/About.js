
import React from "react";
import { Card, CardHeader, Container, Grid, Typography } from "@mui/material";
import FullWidthBox from "../components/FullWidthBox";
import ThirdBox from "../components/ThirdBox";
import HalfWidthBox from "../components/HalfWidthBox";
import logoWithName from "../images/biocompute.png";
import audiencepic from "../images/audience.png"
import "../App.css";

export default function About() {
  return (
    <Card className="about-main">
      <FullWidthBox
        title="Our Mission"
        content="
        BioCompute is a standard for workflow communication. It comes with very strong data provenance, researcher attribution, and descriptive metadata features.<br /><br />
        It is common to hear “x software was used” when reading about a computational pipeline. This is not enough to make informed scientific assessments of work, whether in academic publication reviews, regulatory decisions (e.g. at the FDA), internal process review (particularly for trade secrets), or in educational contexts. Poor workflow communication results in significant delays in reviews, or worse, outright rejection.<br /><br />
        The BioCompute mission is to overhaul the way that computational analyses in biology are shared, understood, and reproduced between the research community, the clinical community, and regulatory organizations."
        image={logoWithName}
        imageAlt="BioCompute logo and name"
      />
      
      <FullWidthBox
        link=""
        title="Our Story"
        content="BioCompute is built through collaboration between the George Washington University 
            and the Food and Drug Administration (FDA) and approved as an official standard of IEEE 
            2791-2020. BioCompute brings transparency of the workflow and clear expectations for data 
            sharing between communities. The project has worked with individuals from NIH, Harvard, 
            several biotech and pharma companies, EMBL-EBI, Galaxy Project, and many more, and can 
            be integrated with any existing standard for HTS data. Associate tools have been developed 
            by popular bioinformatics platforms such as DNAnexus, Seven Bridges, and Galaxy for BCO 
            submission with minimal effort. More information about The current BioCompute standard 
            can be found on the Open Science Foundation website (where the standard is developed 
            and maintained), the HIVE website, and the Research Objects discussion of BioCompute."
        image=""
      />
      <br></br>
      <Grid container justifyContent="space-around" spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <HalfWidthBox justifyContent="left"
            link=""
            title="Our Audience"
            titleClass="centered-title"
            content="
              BioCompute serves a broad range of stakeholders within the scientific and biomedical research communities, including but not limited to:<br />
              <ul style='margin-left: 20px; padding-left: 20px; list-style-position: inside;'>
                  <li>Researchers and Scientists </li>
                  <li>Educators and Students </li>
                  <li>Regulatory Bodies </li>
                  <li>Bioinformatics and Data Analysts </li>
                  <li>Software Developers and Engineers </li>
              </ul>"

            image={audiencepic}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <HalfWidthBox
            link=""
            title="Benefits of BioCompute Objects(BCOs)"
            content="
              <ul style='margin-left: 20px; padding-left: 20px; list-style-position: inside;'>
                  <li><b>Enhanced Transparency:</b> BCOs provide a clear and detailed account of documented computational analyses, ensuring all steps are visible and understandable.  </li>
                  <li><b>Improved Reproducibility:</b> BCOs allow for documented analyses to be easily replicated to validate research findings. </li>
                  <li><b>Streamlined Collaboration:</b> BCOs facilitate better collaboration among researchers by providing a common framework for sharing workflows.  </li>
                  <li><b>Regulatory Compliance:</b> BCOs support regulatory bodies in evaluating the validity and reliability of computational workflows, thereby enhancing the credibility of research. </li>
                  <li><b>Educational Value:</b> BCOs can make it easier for students and educators to grasp complect concepts and analyses much more easily through intuitive documentation.  </li>
              </ul>"

            image=""
          />
       </Grid>
      </Grid>
      <FullWidthBox
        title="Frequently Asked Questions"
        content="
        <ul style='margin-left: 20px; padding-left: 20px; list-style-position: inside;'>
                  <li><b>What role does standardization play in scientific collaboration?</b></li>
                  Standardization, as provided by BCOs, is crucial for seamless collaboration across different institutions and disciplines, enabling researchers to build on each other’s work effectively. 
                  <li><b>How can we improve reproducibility in Biomedical Research?</b></li>
                  Ensuring that research findings can be replicated by others is a cornerstone of scientific integrity. BCOs address this by providing a clear and detailed framework for documenting analyses. 
                  <li><b>How can we ensure regulatory compliance in computational workflows?</b></li>
                  BCOs facilitate compliance by offering a transparent and consistent documentation method, helping regulatory bodies like the FDA evaluate computational analyses more efficiently. 
              </ul>"
        image=""
        />
      <CardHeader
        title="Funding Sources"
        classes={{ title: "home-intro-title" }}
      />
      <FullWidthBox 
        link="https://smhs.gwu.edu/news/gw-led-consortium-receives-22m-grant-fund-biocompute-object-specification-project"
        title=""
        content="FDA BAA-19-00123"
        image=""
      />
      <FullWidthBox
        link="https://commonfund.nih.gov/dataecosystem"
        title=""
        content="Common Fund Data Ecosystem (CFDE) OT2 OD032092"
        image=""
      />
      <Grid container justifyContent="center" spacing={2}>
        <Container className="home-margintop" maxWidth={false}>
          {/* <FullWidthBox
            link=""
            title="Our Goals"
            content="BioCompute is a plat"
            image=""
          /> */}
        </Container>
      </Grid>

    </Card>)
}