import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./Contact.css";


const Contact = () => {
  return (
    <div className="contactContainer">
      <Link className="mailBtn" >
        <Button>Contact: sachinrajput0133@gmail.com</Button><br/>
        <p className="phoneno">PH: 7006043036</p>
       
      </Link>
    </div>
  );
};

export default Contact;