// src/components/bcodbs/index.js

import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import SearchOptions from "./SearchOptions";
import SearchResults from "./SearchResults";

export default function BcoDbs () {
  const [ bcodbInfo, setBcodbInfo ] = useState([])
  const { message } = useSelector((state) => state.message);
  return (
    <Container >
      <Typography variant='h4'>BioCompute Database Search</Typography>
      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
      <SearchOptions
        setBcodbInfo={setBcodbInfo}
      />
      <SearchResults
        bcodbInfo={bcodbInfo}
      />
    </Container>
  );
}