


import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import SearchIcon from '@mui/icons-material/Search';
import {  useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ListAltIcon from '@mui/icons-material/ListAlt';

import "./BotNavigation.css"

import { useNavigate } from 'react-router-dom';
import { Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
const BotNavigation = () => {
    const navigate=useNavigate()
    const [value, setValue] =useState(null)
    const { cartItems } = useSelector((state) => state.cart);
   


 
    


  return (
  <div className="bottomNavigation">
 <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction label="Home" onClick={()=>navigate("/")}   icon={<HomeIcon />} />
      <BottomNavigationAction label="Search" onClick={()=>navigate("/search")}  icon={<SearchIcon />} />
      <BottomNavigationAction label="Cart" onClick={()=>navigate("/cart")}   icon={<Badge badgeContent={ cartItems.length ?   cartItems.length :"0"  } color="success"  > <LocalMallIcon /></Badge>} />
    
    

      <BottomNavigationAction label="Orders" onClick={()=>navigate("/orders")}  icon={<ListAltIcon />} />
      <BottomNavigationAction label="Profile" onClick={()=>navigate("/account")}  icon={  <MenuIcon />} />
   
    </BottomNavigation>
    
  </div>
   

  )
}

export default BotNavigation