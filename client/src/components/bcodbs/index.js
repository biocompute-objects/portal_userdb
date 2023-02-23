// src/components/bcodbs/index.js

import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import SearchOptions from "./SearchOptions";
import SearchResults from "./SearchResults";
import NotifcationBox from "../NotificationBox";

export default function BcoDbs () {
  const [ bcodbInfo, setBcodbInfo ] = useState([])
  const { message } = useSelector((state) => state.message);
  return (
    <Container >
      <Typography variant='h4'>BioCompute Database Search</Typography>
      <NotifcationBox />
      <SearchOptions
        setBcodbInfo={setBcodbInfo}
      />
      <SearchResults
        bcodbInfo={bcodbInfo}
      />
    </Container>
  );
}