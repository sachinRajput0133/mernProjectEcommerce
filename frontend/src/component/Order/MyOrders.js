import React, { Fragment, useEffect } from "react";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { toast } from "react-toastify";
import {  Typography } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom'
import "./MyOrders.css"

const MyOrders = () => {
  
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.myorders);

  const { user } = useSelector((state) => state.user);
  const columns = [
    { field: "id", headerName: "Order Id", minWidth: 300 ,flex:1},
    { field: "status", headerName: "Status",minWidth: 150 ,flex:0.5,
  cellClassName:(params)=>{
    return params.getValue(params.id,"status") ==="Delivered"? "greenColor":"redColor"
  }
  
  },
    { field: "itemsQty", headerName: "Items Qty", type: "number",minWidth: 150 ,flex:0.5},
    { field: "amount", headerName: "Amount", type: "number" ,minWidth: 270 ,flex:0.5},
    { field: "actions", headerName: "Actions", type: "number" ,minWidth: 150 ,flex:0.3 ,sortable:false,
     
    renderCell: (params) =>{
      return(
        <Link to={`/order/${params.getValue(params.id,"id")}`} 
        ><LaunchIcon/></Link>
      )
    }
      // `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  ];

  const rows = [];

orders && orders.forEach((order)=>rows.push({
  itemsQty:order.orderItems.length,
  id:order._id,
  status:order.orderStatus,
  amount:order.totalPrice
}))

  //   console.log(orders ,loading)
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name}- Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="myOdersPage">
            
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
            
         
          />
        <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
