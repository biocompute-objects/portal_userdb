import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export default function HalfWidthBox({ link, title, content, image, imageAlt, cssClass }) {
  const handleClickOpen = () => {
    if (link !== "") {
      global.window.open(link);
    }
  };

  return (
    <Card className={cssClass || "About-half-width-box"}> 
      {link && link.startsWith("https://") ? (
        <CardActionArea onClick={handleClickOpen}>
          <CardContent>
            <Typography className="home-intro-title">
              {title}
            </Typography>
            <br />
            {image && <img src={image} height={100} alt={imageAlt} className="centered-image" />}
            <Typography className="about-text" dangerouslySetInnerHTML={{ __html: content }} />
          </CardContent>
        </CardActionArea>
      ) : (
        <CardActionArea component={Link} to={link} className="About-half-width-box">
          <CardContent>
            <Typography className="home-intro-title">
              {title}
              <br />
              {image && <img src={image} height={100} alt={imageAlt} />} 
              <br />
            </Typography>
            <Typography className="about-text" dangerouslySetInnerHTML={{ __html: content }} />
          </CardContent>
        </CardActionArea>
      )}
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
