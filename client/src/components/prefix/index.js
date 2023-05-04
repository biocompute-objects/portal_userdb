// src/components/prefix/index.js

import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core";
import NotificationBox from "../NotificationBox";
import PrefixResults from "./PrefixResults";
import PrefixSearch from "./PrefixSearch";
import PrefixRegister from "./prefixRegister";
import { useSelector } from "react-redux";

export default function BcoDbs () {
  const prefixes = useSelector(state => state.prefix.data)
  const [addPrefix, setAddPrefix] = useState(false);
  return (
    <Container >
      <Typography variant='h4'>BioCompute Object Prefix Registry</Typography>
      <NotificationBox />
      <PrefixSearch
        setAddPrefix={setAddPrefix}
      />
      {
        (prefixes.length > 1)
          ? (<PrefixResults />)
          : (<div></div>)
      }
      <PrefixRegister
        addPrefix={addPrefix}
        setAddPrefix={setAddPrefix}
      />
    </Container>
  );
}