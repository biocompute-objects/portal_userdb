import React from "react";
import {
  Card,
} from "@material-ui/core";
import { TwitterTimelineEmbed } from "react-twitter-embed";


export default function BcoDbViewer() {

  return (
    <Card className="home-linkcard">
      <TwitterTimelineEmbed
        noFooter
        sourceType="profile"
        screenName="BioComputeObj"
        options={{ height: 700 }}
      />
    </Card>
  );
}
