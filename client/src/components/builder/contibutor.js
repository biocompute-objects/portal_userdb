import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import { MyTextField, MultiSelector } from "./specialFeilds";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const Contribution = ({contributor, contributorPath}) => {

  return (
    <Card >
      <MyTextField name={`${contributorPath}.name`} type="input" placeholder="Name" label='Name' isRequired />
      <MyTextField name={`${contributorPath}.affiliation`} type="input" placeholder="Affiliation" label='Affiliation' />
      <MyTextField name={`${contributorPath}.email`} type="input" placeholder="Email" label='Email' />
      <MultiSelector
        name={`${contributorPath}.contribution`}
        list={contributor.contribution}
        label='Contribution'
        isRequired
      />
    </Card>
  )
}