// 

import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@mui/material";
import PropTypes from 'prop-types';

export default function FullWidthBox({ link, title, content, image, imageAlt, cssClass }) {

  const handleClickOpen = () => {
    if (link !== "") {
      global.window.open(link);
    }
  };

  return (
    <Card className="About-Full-Width-Box">
      <Box className={cssClass}>
        <CardActionArea onClick={handleClickOpen}>
          <CardContent>
            <Typography className="home-intro-title">
              {title}
            </Typography>
            <br></br>
            <div className="inline-content">
            <Typography className="about-text" component="div" dangerouslySetInnerHTML={{ __html: content }} />
              {image && <img src={image} height={100} alt={imageAlt} className="centered-image" />} 
              
            </div>
            {/* {image && <img src={image} height={100} alt={imageAlt} className="centered-image" />} 
            <Typography className="about-text" component="div" dangerouslySetInnerHTML={{ __html: content }} /> */}
          </CardContent>
        </CardActionArea>
      </Box>
    </Card>
  );
}

FullWidthBox.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  cssClass: PropTypes.string
};

FullWidthBox.defaultProps = {
  link: '',
  image: '',
  imageAlt: 'Image',
  cssClass: ''
};
