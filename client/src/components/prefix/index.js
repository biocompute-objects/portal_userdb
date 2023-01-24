// src/components/prefix/index.js

import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core";
import NotificationBox from "../NotificationBox";
import PrefixResults from "./PrefixResults";
import PrefixSearch from "./PrefixSearch";
import PrefixRegister from "./prefixRegister";

export default function BcoDbs () {
  const [addPrefix, setAddPrefix] = useState(false);
  return (
    <Container >
      <Typography variant='h4'>BioCompute Object Prefix Registry</Typography>
      <NotificationBox />
      <PrefixSearch
        setAddPrefix={setAddPrefix}
      />
      <PrefixResults />
      <PrefixRegister
        addPrefix={addPrefix}
        setAddPrefix={setAddPrefix}
      />
    </Container>
  );
}