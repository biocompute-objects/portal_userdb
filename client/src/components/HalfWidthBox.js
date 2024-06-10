import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import PropTypes from 'prop-types';

export default function HalfWidthBox({ link, title, content, image, imageAlt, cssClass }) {
  const handleClickOpen = () => {
    if (link !== "") {
      global.window.open(link);
    }
  };

  return (
    <Card className="About-half-width-box"> {/* Define a CSS class for half-width box */}
      <CardActionArea onClick={handleClickOpen}>
        <CardContent>
          <Typography className="home-intro-title">
            {title}
          </Typography>
          {image && <img src={image} height={100} alt={imageAlt} />}
          <Typography className={cssClass} dangerouslySetInnerHTML={{ __html: content }} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

HalfWidthBox.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  cssClass: PropTypes.string
};

HalfWidthBox.defaultProps = {
  link: '',
  image: '',
  imageAlt: 'Image',
  cssClass: ''
};