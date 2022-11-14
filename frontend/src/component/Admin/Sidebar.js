import React from 'react'
import { Link } from 'react-router-dom'
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import "./Sidebar.css"
const Sidebar = () => {
  return (
    <div className="sidebar">
        <Link to="/" >

        <div className="logoDesign"  >
           <img src="/l1.png" alt=""  />
          </div>

        </Link>
        <Link to="/admin/dashboard" >
            <p>
            <DashboardIcon />Dashboard
            </p>
        </Link>
        <Link>
        <TreeView
    //   aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    //   sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <TreeItem nodeId="1" label="Products">
        <Link to="/admin/products" >
         <TreeItem nodeId="2" label="All" icon={<PostAddIcon/>} />
      </Link>
        <Link to="/admin/product" >
         <TreeItem nodeId="3" label="Create" icon={<AddIcon/>} />
      </Link>
      </TreeItem>
    
       </TreeView>
        </Link>
        <Link to="/admin/orders" >
            <p> <ListAltIcon/> Orders</p>
        </Link>
        <Link to="/admin/users" >
            <p> <PeopleIcon/> Users</p>
        </Link>
        <Link to="/admin/reviews" >
            <p> <RateReviewIcon/> Reviews</p>
        </Link>
    </div>
  )
}

export default Sidebar