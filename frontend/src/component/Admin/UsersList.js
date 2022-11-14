import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearErrors} from '../../actions/productAction'
import EditIcon from '@mui/icons-material/Edit';
import { Link,  useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from '../MetaData';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import "./ProductList.css"
import { Button } from '@mui/material';

import { DELETE_USER_RESET } from '../../constants/userConstants';
import { deleteUser, getAllUsers } from '../../actions/userAction';
const UsersList = () => {

const dispatch=useDispatch()
const { error, users }=useSelector(state=>state.allusers )
const {error:deleteError,isDeleted, message}=useSelector(state=>state.profile)
const navigate=useNavigate()


const deleteUserHandler=(id)=>{
  dispatch(deleteUser(id))
}

const columns = [
    { field: "id", headerName: "User Id", minWidth: 200 ,flex:0.8},
    { field: "email", headerName: "Email",minWidth: 350 ,flex:1},
    { field: "name", headerName: "Name",minWidth: 150 ,flex:0.3},
    { field: "role", headerName: "Role", type: "number" ,minWidth: 270 ,flex:0.5,
  
    cellClassName:(params)=>{
      return params.getValue(params.id,"role") ==="admin"? "greenColor":"redColor"
    }
  },
    { field: "actions", headerName: "Actions", type: "number" ,minWidth: 150 ,flex:0.3 ,sortable:false,
     
    renderCell: (params) =>{
      return(
        <Fragment>
            <Link
             to={`/admin/user/${params.getValue(params.id,"id")}`} 
            ><EditIcon/></Link>
              
           <Button onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}  >
                <DeleteIcon   />


           </Button>
                 
            
        </Fragment>
      )
    }
      // `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  ];

  const rows = [];

  users && users.forEach((user)=>rows.push({
    id:user._id,
    email:user.email,
    name:user.name,
    role:user.role,
}))








useEffect (() => {


if(error){
    toast.error(error)
dispatch(clearErrors())
}
if(deleteError){
    toast.error(deleteError)
  dispatch(clearErrors())
}
if(isDeleted){
  toast.success(message)
  navigate("/admin/users")
  dispatch({type:DELETE_USER_RESET})
}

dispatch(getAllUsers())



}, [dispatch,error,isDeleted,deleteError,navigate,message])





  return (
   <Fragment>
    <MetaData  title="All Users -Admin" />

  <div className="dashboard">
    <Sidebar/>
    <div className="productListContainer">
        <h1 className='productListHeading' >All Users</h1>
        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        className='productListTable'
        autoHeight
        />
    </div>
  </div>


   </Fragment>
  )
}



export default UsersList