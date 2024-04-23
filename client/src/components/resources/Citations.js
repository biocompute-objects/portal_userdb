// src/components/resources/Citations.js

import React from "react";
import {
  Card,
  CardContent,
  Typography
} from "@material-ui/core";

export default function Citations() {
  const logo = require("../../images/logo.png");

  return (
    <Card className="resources-root resources-supportcard" elevation={5}>
      <CardContent>
        <Typography className="resources-title">
          <img src={logo} height={36} alt="BCO logo" />
          BCO Citations
          <br />
        </Typography>
        <div className="resources-supportcard">
          <ol>
            <li>
              <div vocab="http://schema.org" typeof="ScholarlyArticle">
                <span property="author">King CH, Keeney J, Guimera N, Das S, Weber M, Fochtman B, Walderhaug MO, Talwar S, Patel JA, Mazumder R, Donaldson EF.</span>
                <span property="name"> Communicating regulatory high-throughput sequencing data using BioCompute Objects. </span>
                <span property="isPartOf" typeof="PublicationIssue">
                  <span property="name" typeof="Periodical">Drug Discov Today</span>
                  .
                  <span property="datePublished"> 2022 Jan 22</span>
                  ;
                  <span property="isPartOf" typeof="PublicationVolume"><span property="volumeNumber" /></span>
                  {" "}
                  PMID:
                  {" "}
                  <a property="sameAs" href="https://pubmed.ncbi.nlm.nih.gov/35077912/" target="_blank" rel="noreferrer">35077912</a>
                </span>
                .
              </div>
            </li>
            <li>
              <div vocab="http://schema.org" typeof="ScholarlyArticle">
                <span property="author">
                  Stian Soiland-Reyes, Peter Sefton, Mercè Crosas, Leyla Jael Castro, Frederik Coppens, José M. Fernández, Daniel Garijo, Björn Grüning, Marco La Rosa,
                  Simone Leo, Eoghan Ó Carragáin, Marc Portier, Ana Trisovic, RO-Crate Community, Paul Groth, Carole Goble.
                </span>
                <span property="name"> Packaging research artefacts with RO-Crate.</span>
                <span property="isPartOf" typeof="PublicationIssue">
                  <span property="name" typeof="Periodical"> Data Science</span>
                  ,
                  <span property="datePublished"> 2022</span>
                  ;
                  <span property="isPartOf" typeof="PublicationVolume"><span property="volumeNumber" /></span>
                  <a property="sameAs" href="https://doi.org/10.3233/DS-210053" target="_blank" rel="noreferrer"> https://doi.org/10.3233/DS-210053</a>
                </span>
                .
              </div>
            </li>
            <li>
              <div vocab="http://schema.org" typeof="ScholarlyArticle">
                <span property="author">Patel JA, Dean DA, King CH, Xiao N, Koc S, Minina E, Golikov A, Brooks P, Kahsay R, Navelkar R, Ray M, Roberson D, Armstrong C, Mazumder R, Keeney J.</span>
                <br />
                <span property="name">Bioinformatics tools developed to support BioCompute Objects.</span>
                <span property="isPartOf" typeof="PublicationIssue">
                  <span property="name" typeof="Periodical"> Database (Oxford)</span>
                  .
                  <span property="datePublished">2021 March 31</span>
                  ;
                  <span property="isPartOf" typeof="PublicationVolume"><span property="volumeNumber" /></span>
                  {" "}
                  PMID:
                  <a property="sameAs" href="https://pubmed.ncbi.nlm.nih.gov/33784373/" target="_blank" rel="noreferrer">33784373</a>
                </span>
                .
              </div>
            </li>
            <li>
              <div vocab="http://schema.org" typeof="ScholarlyArticle">
                <span property="author">Alterovitz G, Dean D A, Goble C, Crusoe M R, Soiland-Reyes S, Bell A, Hayes A, King, C H S, Taylor D, Johanson E, Thompson E E, Donaldson E, Morizono H, Tsang H S, Goecks J, Yao J, Almeida J S, Krampis K, Guo L, Walderhaug M, Walsh P, Kahsay R, Gottipati S, Bloom T, Lai Y, Simonyan V, Mazumder R</span>
                .
                <span property="name"> Enabling Precision Medicine via standard communication of HTS provenance, analysis, and results</span>
                .
                <span property="isPartOf" typeof="PublicationIssue">
                  <span property="name" typeof="Peridical"> PLOS Biology; 16(12): e3000099</span>
                  .
                  <span property="datePublished">2018.</span>
                  <a property="sameAs" href="https://doi.org/10.1371/journal.pbio.3000099" target="_blank" rel="noreferrer"> https://doi.org/10.1371/journal.pbio.3000099</a>
                </span>
              </div>
            </li>

            <li>
              <div vocab="http://schema.org/" typeof="ScholarlyArticle">
                <span property="author">Simonyan V, Goecks J, Mazumder R</span>
                .
                <span property="name"> BioCompute objects - a step towards evaluation and validation of bio-medical scientific computations</span>
                .
                <span property="isPartOf" typeof="PublicationIssue">
                  <span property="name" typeof="Peridical"> PDA J Pharm Sci Technol</span>
                  .
                  <span property="datePublished"> 2017</span>
                  ;
                  <span property="isPartOf" typeof="PublicationVolume"><span property="volumeNumber">71</span></span>
                  (
                  <span property="issueNumber">2</span>
                  ):136-146 PMID:
                  <a property="sameAs" href="https://www.ncbi.nlm.nih.gov/pubmed/27974626" target="_blank" rel="noreferrer">27974626</a>
                </span>
                .
              </div>
            </li>
            <li>
              <div vocab="http://schema.org/" typeof="ScholarlyArticle">
                <span property="author">Keeney JG, Gulzar N, Baker JB, Klempir O, Hannigan GD, Bitton DA, Maritz JM, King CHS 4th, Patel JA, Duncan P, Mazumder R.</span>
                .
                <span property="name"> Communicating computational workflows in a regulatory environment</span>
                .
                <span property="isPartOf" typeof="PublicationIssue">
                  <span property="name" typeof="Peridical"> Drug Discov Today</span>
                  .
                  <span property="datePublished"> 2024 Mar</span>
                  ;
                  <span property="isPartOf" typeof="PublicationVolume"><span property="volumeNumber">103884</span></span>
                  (
                  <span property="issueNumber">3</span>
                  ) PMID:
                  <a property="sameAs" href="https://pubmed.ncbi.nlm.nih.gov/38219969/" target="_blank" rel="noreferrer">38219969</a>
                </span>
                .
              </div>
            </li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}