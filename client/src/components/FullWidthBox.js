// src/views/home/HomeView/FdaBox.js

import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@mui/material";

export default function FullWidthBox({link, title, content, image, imageAlt, cssClass}) {

  const handleClickOpen = () => {
    if (link !== "") {
      global.window.open(link)
    }
  };

  return (
    <Card className="home-notice">
      <Box className={cssClass}>
        <CardActionArea onClick={handleClickOpen}>
          <CardContent >
            <Typography className="home-intro-title">
              {title}
            </Typography>
            {image && <img src={image} height={100} alt={imageAlt} />} 
            <Typography >{content}</Typography>
          </CardContent>
        </CardActionArea>
      </Box>
    </Card>
  );
}
