// src/components/bcodbs/index.js

import React, { useState } from "react";
import { Box, Container, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import NotificationBox from "../NotificationBox";
import PrefixResults from "./PrefixResults";
import PrefixSearch from "./PrefixSearch";

export default function BcoDbs () {
  return (
    <Container >
      <Typography variant='h4'>BioCompute Object Prefix Registry</Typography>
      <NotificationBox />
      <PrefixSearch />
      <PrefixResults />
    </Container>
  );
}