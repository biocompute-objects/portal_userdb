// src/views/home/HomeView/BcoDb.js

import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@material-ui/core";
import { Link } from "react-router-dom"

export default function ThirdBox({link, title, content, image, imageAlt, cssClass}) {

  return (
    <Card className="home-linkcard" elevation={1}>
      {link && link.includes("https://") ?(
        <CardActionArea onClick={() => global.window.open(link)}>
          <CardContent>
            <Typography className="home-intro-title">
              {title}
              <br />
              {image && <img src={image} height={100} alt={imageAlt} />} 
              <br />
            </Typography>
            <Typography className="home-bullet">{content}</Typography>
          </CardContent>
        </CardActionArea>
      ) : (
        <CardActionArea className="home-linkcard" component={Link} to={link}>
          <CardContent>
            <Typography className="home-intro-title">
              {title}
              <br />
              {image && <img src={image} height={100} alt={imageAlt} />} 
              <br />
            </Typography>
            <Typography className="home-bullet">{content}</Typography>
          </CardContent>
        </CardActionArea>
      )
      }
    </Card>
  );
}
