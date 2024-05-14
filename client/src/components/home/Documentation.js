// src/views/resources/Resources/CGC.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@material-ui/core";

import mediaWiki from "../../images/mediawikiwiki.svg";
import api from "../../images/api.jpeg";

export default function Documentation() {
  const wikiLink = "https://wiki.biocomputeobject.org/index.php?title=Main_Page";
  const apiLink = "https://biocomputeobject.org/api/docs/";

  return (
    <Card className="home-linkcard" elevation={1}>
      <Typography className="home-intro-title">
        BioCompute Objects Documentation
      </Typography>
      <br />
      <br />
      <CardActionArea onClick={() => global.window.open(apiLink)}>
        <CardContent>
          <Typography className="home-subtitle">
            <img src={api} height={25} alt="MediaWiki logo" />
            API
            <br />
          </Typography>
        </CardContent>
      </CardActionArea>
      <br />
      <CardActionArea onClick={() => global.window.open(wikiLink)}>
        <CardContent>
          <Typography className="home-subtitle">
            <img src={mediaWiki} height={25} alt="MediaWiki logo" />
            BioCompute Wiki
            <br />
          </Typography>
          <Typography className="home-bullet">
          The MediaWiki for the BioCompute Objects project
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
