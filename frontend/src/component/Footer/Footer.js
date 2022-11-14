import React from 'react'
import playStore from "../../images/playstore.png"
import appStore from "../../images/Appstore.png"
import "./Footer.css"
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer id="footer" >

     <div className="leftFooter">
        <h4>Download Our App</h4>
        <p>Download App for Anroid and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="AppStore" />

     </div>
     <div className="midFooter">
     <div className="footerLogoDesign" >
           <img src="/l2.png" alt="" />
          </div>
           <p>High quality and fast delivery</p>
           <p>copyrights 2022 &copy; sachin</p>
     </div>
     <div className="rightFooter">
              <h4>Follow Us</h4>
              <Link to="">Instagram</Link>
              <Link to="">youtube</Link>
              <Link to="">facebook</Link>
     </div>

    </footer>
  )
}

export default Footer