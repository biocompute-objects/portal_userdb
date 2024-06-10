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
            {image && <img src={image} height={100} alt={imageAlt} />} 
            <Typography component="div" dangerouslySetInnerHTML={{ __html: content }} />
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
