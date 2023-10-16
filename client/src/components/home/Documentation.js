// src/views/resources/Resources/CGC.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core";

import mediaWiki from "../../images/mediawikiwiki.svg";
import api from "../../images/api.jpeg";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  linkCard: {
    minHeight: "300px",
    textAlign: "center"
  },
  supportCard: {
    textAlign: "center",
    marginBottom: 12,
    minHeight: "460px",
    minWidth: 275
  },
  title: {
    minWidth: 275,
    fontSize: "33px"
  },
  subtitle: {
    fontSize: "25px",
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Documentation() {
  const classes = useStyles();
  const wikiLink = "https://wiki.biocomputeobject.org/index.php?title=Main_Page";
  const docsLink = "https://docs.biocomputeobject.org/";

  return (
    <Card className={classes.supportCard} elevation={1}>
      <Typography className={classes.title}>
        BioCompute Objects Documentation
      </Typography>
      <br />
      <br />
      <CardActionArea onClick={() => global.window.open(docsLink)}>
        <CardContent>
          <Typography className={classes.subtitle}>
          <img src={api} height={25} alt="MediaWiki logo" />
            API
            <br />
          </Typography>
        </CardContent>
      </CardActionArea>
      <br />
      <CardActionArea onClick={() => global.window.open(wikiLink)}>
        <CardContent>
          <Typography className={classes.subtitle}>
            <img src={mediaWiki} height={25} alt="MediaWiki logo" />
            BioCompute Wiki
            <br />
          </Typography>
          <Typography className={classes.bullet}>
          The MediaWiki for the BioCompute Objects project
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
