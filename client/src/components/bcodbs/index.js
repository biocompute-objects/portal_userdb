// src/components/bcodbs/index.js

import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import SearchOptions from "./SearchOptions";
import SearchResults from "./SearchResults";
import NotifcationBox from "../NotificationBox";
import { useSelector } from "react-redux";

export default function BcoDbs () {
  const [ bcodbInfo, setBcodbInfo ] = useState([])
  const searchStatus = useSelector(state => state.search.status)

  return (
    <Container >
      <Typography variant='h4'>BioCompute Database Search</Typography>
      <NotifcationBox />
      <SearchOptions
        setBcodbInfo={setBcodbInfo}
      />
      {
        (searchStatus === "idle")
          ? (<div></div>)
          : (<SearchResults bcodbInfo={bcodbInfo}/>)
      }
    </Container>
  );
}