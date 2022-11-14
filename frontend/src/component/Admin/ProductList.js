import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearErrors, deleteProduct, getAdminProducts } from '../../actions/productAction'
import EditIcon from '@mui/icons-material/Edit';
import { Link,  useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from '../MetaData';
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import "./ProductList.css"
import { Button } from '@mui/material';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
const ProductList = () => {

const dispatch=useDispatch()
const { error, products }=useSelector(state=>state.products )
const {error:deleteError,isDeleted}=useSelector(state=>state.product)
const navigate=useNavigate()


const deleteProductHandler=(id)=>{
  dispatch(deleteProduct(id))
}

const columns = [
    { field: "id", headerName: "Product Id", minWidth: 200 ,flex:0.5},
    { field: "name", headerName: "Name",minWidth: 350 ,flex:1,},
    { field: "stock", headerName: "Stock", type: "number",minWidth: 150 ,flex:0.3},
    { field: "price", headerName: "Price", type: "number" ,minWidth: 270 ,flex:0.5},
    { field: "actions", headerName: "Actions", type: "number" ,minWidth: 150 ,flex:0.3 ,sortable:false,
     
    renderCell: (params) =>{
      return(
        <Fragment>
            <Link
             to={`/admin/product/${params.getValue(params.id,"id")}`} 
            ><EditIcon/></Link>
              
           <Button onClick={()=>deleteProductHandler(params.getValue(params.id,"id"))}  >
                <DeleteIcon   />


           </Button>
                 
            
        </Fragment>
      )
    }
      // `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  ];

  const rows = [];

products && products.forEach((product)=>rows.push({
    id:product._id,
    stock:product.stock,
    price:product.price,
    name:product.name
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
  toast.success("Product Deleted Successfully")
  navigate("/admin/products")
  dispatch({type:DELETE_PRODUCT_RESET})
}

dispatch(getAdminProducts())



}, [dispatch,error,isDeleted,deleteError,navigate])





  return (
   <Fragment>
    <MetaData  title="All Products -Admin" />

  <div className="dashboard">
    <Sidebar/>
    <div className="productListContainer">
        <h1 className='productListHeading' >All Products</h1>
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

export default ProductList