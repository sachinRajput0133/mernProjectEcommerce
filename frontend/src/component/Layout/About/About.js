import React from 'react'
import "./About.css"

import { Button, Typography } from "@mui/material";

import { Avatar } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';
const About = () => {
  
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src=""
              alt="Founder"
            />
            <Typography>Sachin Chib</Typography>
            <Button
         
             color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a Ecommerce wesbite made by @SachinChib. 
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <Link
             to="/"
            //   target="blank"
            >
              <YouTubeIcon className="youtubeSvgIcon" />
            </Link>

            <Link to="/">
              <InstagramIcon className="instagramSvgIcon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;