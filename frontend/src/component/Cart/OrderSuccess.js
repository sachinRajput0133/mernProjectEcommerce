import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import "./OrderSuccess.css"
import DoneIcon from '@mui/icons-material/Done';
const OrderSuccess = () => {
  return (
    <div className="orderSuccess" >
    <DoneIcon/>
    <Typography>Your Order Has Been Placed Successfully</Typography>
    <Link  to="/orders" >View Orders</Link>
   </div>
  )
}

export default OrderSuccess