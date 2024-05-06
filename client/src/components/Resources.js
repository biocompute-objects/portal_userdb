// src/components/Resources.js

import React from "react";
import {
  Container,
  Grid,
  Paper,
} from "@mui/material";

import ThirdBox from "./ThirdBox.js";
import FullWidthBox from "./FullWidthBox.js";
import logo from "../images/logo.png"
import hive from "../images/hive.png"
import gitLogo from "../images/Octocat.png";
import cranLogo from "../images/cran.png";
import dnaNexus from "../images/dnanexus.png"
import galaxy from "../images/galaxy.png"
import cgc from "../images/cgc2.png"

export default function Resources() {

  return (
    <Paper>
      <Container maxWidth={false}>
        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12} sm={6} lg={4} xl={4}>
            <ThirdBox
              link="https://hive.biochemistry.gwu.edu/dna.cgi?cmd=main"
              title="HIVE Platform"
              content="The High-throughput Integrated Virtual Environment (HIVE) for
              genome analysis has platform specific tools for generating BioCompute Objects
              from workflows."
              cssClass=""
              image={hive}
              imageAlt="HIVE logo"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={4}>
            <ThirdBox
              link="https://github.com/biocompute-objects/bcotool/tree/1.1.0"
              title="BCO-TOOL"
              content="Command line tool for to create, validate, and export BioCompute Objects."
              cssClass=""
              image={gitLogo}
              imageAlt="GitHub Logo"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={4}>
            <ThirdBox
              link="https://cran.r-project.org/web/packages/biocompute/index.html"
              title="CRAN BioCompute Tool"
              content="Tools to create, validate, and export BioCompute Objects in R. Users can encode information in data frames, and compose BioCompute Objects from the domains defined by the standard."
              cssClass=""
              image={cranLogo}
              imageAlt="CRAN Logo"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={4}>
            <ThirdBox
              link=""
              title="BCO Nexus"
              content="BCOnexus developed by DNAnexus as a platform-free Docker tool for quick BCO evaluation."
              cssClass=""
              image={dnaNexus}
              imageAlt="DNAnexus Logo"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={4}>
            <ThirdBox
              link=""
              title="Galaxy Platform"
              content="The Galaxy BCO API Extension enables Galaxy users to the export of
              Galaxy “workflow invocations” (i.e. realizations of a computational pipeline) in
              BCO format."
              cssClass=""
              image={galaxy}
              imageAlt="Galaxy Project Logo"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={4} xl={4}>
            <ThirdBox
              link="https://www.cancergenomicscloud.org/"
              title="Cancer Genomics Cloud Seven Bridges"
              content="Tools to create, validate, and export BioCompute Objects in R"
              cssClass=""
              image={cgc}
              imageAlt="CGC Logo"
            />
          </Grid>
        </Grid>
        <FullWidthBox
          title="BioCompute Citations"
          image={logo}
        />
        <FullWidthBox
          content="Keeney JG, Gulzar N, Baker JB, Klempir O, Hannigan GD, Bitton DA, Maritz JM, King CHS 4th, Patel JA, Duncan P, Mazumder R.. Communicating computational workflows in a regulatory environment. Drug Discov Today. 2024 Mar;103884(3) PMID:38219969."
          link="https://pubmed.ncbi.nlm.nih.gov/38219969/"
          cssClass="resources-citation"
        /> 
        <FullWidthBox
          content="King CH, Keeney J, Guimera N, Das S, Weber M, Fochtman B, Walderhaug MO, Talwar S, Patel JA, Mazumder R, Donaldson EF. Communicating regulatory high-throughput sequencing data using BioCompute Objects. Drug Discov Today. 2022 Jan 22; PMID: 35077912."
          link="https://pubmed.ncbi.nlm.nih.gov/35077912/"
          cssClass="resources-citation"
        />
        <FullWidthBox
          content="Stian Soiland-Reyes, Peter Sefton, Mercè Crosas, Leyla Jael Castro, Frederik Coppens, José M. Fernández, Daniel Garijo, Björn Grüning, Marco La Rosa, Simone Leo, Eoghan Ó Carragáin, Marc Portier, Ana Trisovic, RO-Crate Community, Paul Groth, Carole Goble. Packaging research artefacts with RO-Crate. Data Science, 2022;"
          link="https://doi.org/10.3233/DS-210053"
          cssClass="resources-citation"
        />
        <FullWidthBox
          content="Patel JA, Dean DA, King CH, Xiao N, Koc S, Minina E, Golikov A, Brooks P, Kahsay R, Navelkar R, Ray M, Roberson D, Armstrong C, Mazumder R, Keeney J.
              Bioinformatics tools developed to support BioCompute Objects. Database (Oxford).2021 March 31; PMID:33784373."
          link="https://pubmed.ncbi.nlm.nih.gov/33784373/"
          cssClass="resources-citation"
        />
        <FullWidthBox
          content="Alterovitz G, Dean D A, Goble C, Crusoe M R, Soiland-Reyes S, Bell A, Hayes A, King, C H S, Taylor D, Johanson E, Thompson E E, Donaldson E, Morizono H, Tsang H S, Goecks J, Yao J, Almeida J S, Krampis K, Guo L, Walderhaug M, Walsh P, Kahsay R, Gottipati S, Bloom T, Lai Y, Simonyan V, Mazumder R. Enabling Precision Medicine via standard communication of HTS provenance, analysis, and results. PLOS Biology; 16(12): e3000099.2018."
          link="https://doi.org/10.1371/journal.pbio.3000099"
          cssClass="resources-citation"
        />
        <FullWidthBox
          content="Simonyan V, Goecks J, Mazumder R. BioCompute objects - a step towards evaluation and validation of bio-medical scientific computations. PDA J Pharm Sci Technol. 2017;71(2):136-146 PMID:27974626"
          link="https://pubmed.ncbi.nlm.nih.gov/27974626/"
          cssClass="resources-citation"
        />
        <br/><br/>
      </Container>
    </Paper>
  );
}
