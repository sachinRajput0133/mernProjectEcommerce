import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import "./Header.css"
import HomeIcon from '@mui/icons-material/Home';
import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';

import SpeedDialAction from '@mui/material/SpeedDialAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react';
import SearchIcon from '@mui/icons-material/Search';
// import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import PrintIcon from '@mui/icons-material/Print';
// import ShareIcon from '@mui/icons-material/Share';








export default function UserOptions({user}) {
   const navigate=useNavigate() 
  const dispatch=useDispatch()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const  { cartItems  }=useSelector((state)=>state.cart)
  const actions = [
    { icon: <ListAltIcon />, name: 'Orders' ,func:orders  },
    { icon: <PersonIcon />, name: 'Profile'   ,func:account  },
    { icon: <ShoppingCartIcon style={{color:cartItems.length>0?"tomato":"unset"}}  />, name: `Cart(${cartItems.length}) `   ,func:cart  },
    { icon: <SearchIcon/>, name: 'Search'   ,func:search  },
    { icon: <HomeIcon/>, name: 'Home' ,func:home  },
    { icon: <ExitToAppIcon />, name: 'Logout' ,func:logoutUser  },
    
  ];
  
  
  if(user.role==="admin"){
  
  actions.unshift({icon: <DashboardIcon />, name: 'Dashboard' ,func:dashboard})
  
  }
  
  function dashboard(){
      navigate("/admin/dashboard")
  }
  function orders(){
      navigate("/orders")
  }
  function cart(){
      navigate("/cart")
  }
  function search(){
      navigate("/search")
  }
  function account(){
      navigate("/account")
  }
  function home(){
      navigate("/")
  }
  function logoutUser(){
      dispatch(logout())
    //   Navigate("/login")
      toast.success("Logout Successfully")
  }
  return (

    <Fragment>

   
    <Box className='Box' 
    
    
    // sx={{ height: 330,  transform: 'translateZ(0px)', flexGrow: 1 }}
    
    >
      <Backdrop  open={open} style={{zIndex:"10"  }} />
      <SpeedDial
       className='speedDial'
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<img className='speedDialIcon' src={ user.avatar.url ?user.avatar.url: "/Profile.png"  }  alt="/Profile.png" />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="down"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen={window.innerWidth<=600? true :false }
            onClick={action.func}
          />
        ))}
      </SpeedDial>
    </Box>
    </Fragment>
  );
}

