import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ShopIcon from '@mui/icons-material/Shop';
import SearchIcon from '@mui/icons-material/Search';
import LocalMallIcon from '@mui/icons-material/LocalMall';

import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CachedIcon from '@mui/icons-material/Cached';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import InfoIcon from '@mui/icons-material/Info';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Avatar } from '@mui/material';
import "./SideMenuBar.css"
import { logout } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const SideMenuBar = ({setOpenMenu}) => {
  const {isAuthenticated ,user}=useSelector(state=>state.user)
  const dispatch=useDispatch()
const closeMenuHandler=()=>{
  setOpenMenu(false)
}
const logoutHandler=()=>{
  closeMenuHandler()
  dispatch(logout())
  toast.success("Logged Out Successfully")
}

  return (
    <Fragment>
        <div className="meruBurgerItems">
          <Link to="/account" onClick={()=>closeMenuHandler()}  className='menuBurgerProfileBox' >
             <Avatar alt="Remy Sharp" src={user && user?.avatar?.url} />
             <div className="meruBurgerProfileHeading">
                 <p>{user && user.name}</p>
                 <p>view your Profile</p>
              </div> 
          
          </Link>
          <Link to="/" onClick={()=>closeMenuHandler()}  >
           <ShopIcon/>
           <p>Visit Shop</p>
          
          </Link>
          <Link to="/search" onClick={()=>closeMenuHandler()} >
          <SearchIcon/>
           <p>Search Products</p>
          
          </Link>
          <Link  to="/orders" onClick={()=>closeMenuHandler()} >
          <LocalMallIcon/>
           <p>My Orders</p>
          
          </Link>
          <Link to="/password/update" onClick={()=>closeMenuHandler()} >
          <VpnKeyIcon/>
           <p>Change Password</p>
          
          </Link>
          <Link to="/password/forgot" onClick={()=>closeMenuHandler()} >
          <CachedIcon/>
           <p>Forgot Password</p>
          
          </Link>
          <Link to="/updatemyprofile" onClick={()=>closeMenuHandler()} >
          <DynamicFeedIcon/>
           <p>Update Profile</p>
           </Link>
          <Link to="/about" onClick={()=>closeMenuHandler()} >
          <InfoIcon/>
           <p>About Us</p>
           </Link>
          <Link to="/contact" onClick={()=>closeMenuHandler()} >
          <ContactPageIcon/>
           <p>Contact Us</p>
           </Link>
          
     {
      isAuthenticated &&  <Link    onClick={()=>logoutHandler()} >
      <ExitToAppIcon/>
      <p>Logout</p>
     
     </Link>
     }    
        </div>

      

    </Fragment>
  )
}

export default SideMenuBar