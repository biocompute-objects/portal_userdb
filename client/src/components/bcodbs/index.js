// src/components/bcodbs/index.js

import React from "react";
import SearchOptions from "./SearchOptions";
import { Container, makeStyles, Typography } from "@material-ui/core";
import SearchResults from "./SearchResults";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

export default function BcoDbs () {
  const classes = useStyles()
  return (
    <Container >
      <Typography variant='h4'>BioCompute Database Search</Typography>
      <SearchOptions />
      <SearchResults />
    </Container>
  );
}