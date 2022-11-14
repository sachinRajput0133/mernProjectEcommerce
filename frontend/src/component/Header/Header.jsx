import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import SearchHeader from "./SearchHeader";
import * as React from "react";
import Badge from "@mui/material/Badge";

import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';


import { logout } from "../../actions/userAction";
import SideMenuBar from "./SideMenuBar";

const Header = () => {
  const navigate=useNavigate()
  const [openMenu,setOpenMenu]=React.useState(false)
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const {isAuthenticated,}=useSelector(state=>state.user)

const handleSubmit=()=>{
  navigate("/")
  window.scroll(0,0)
}

  return (
    <>
      {" "}
      <div className="headerContainer">
        <div className="headerBox1">
          <div>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
           
            >
              {/* <button onClick={()=>setOpenMenu(!openMenu)}  className="hamburgerMenuButton" > */}
              <button onClick={()=>setOpenMenu(!openMenu)}  className="hamburgerMenuButton" >
           {
              openMenu ? <CloseIcon/>: <MenuIcon  />
           }
             
              </button>
            </IconButton>
          </div>
          <div className="logoDesign" onClick={()=>handleSubmit()} >
           <img src="/l2.png" alt=""  />
          </div>
        </div>
        <div className="headerBox2"  >
          <SearchHeader />
        </div>
        <div className="headerBox3">
     {
       !isAuthenticated &&  <Link to="/login">
       {" "}
       <Button color="inherit"> Login</Button>
     </Link>
     }     
       {
        isAuthenticated && <Button onClick={() => dispatch(logout())} color="inherit">
        {" "}
        Logout
      </Button>
       }   

          <Link to="/cart">
            <Badge badgeContent={cartItems.length} color="success">
              <ShoppingCartIcon style={{ color: "white" }} />
            </Badge>
          </Link>
        </div>
      </div>
      {/* <div className="searchContainer">
        <SearchHeader />
      </div>  */}
     
       
         <div className="sideMenuBarContainer"  style={{transform:openMenu ? "translateX(0)":"translateX(-100%)" }}  >
         <SideMenuBar setOpenMenu={setOpenMenu} openMenu={openMenu}  />
         </div>
      
    
    </>
  );
};

export default Header;

