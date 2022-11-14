import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearErrors, getOrderDetails } from '../../actions/orderAction'
import "./OrderDetails.css"
import Loader from '../Loader/Loader'
import { Helmet } from 'react-helmet'
import { Typography } from '@mui/material'
const OrderDetails = () => {



const dispatch=useDispatch()
const {id}=useParams()
const {order ,loading,error}=useSelector(state=>state.orderDetails)



useEffect(() => {
if(error){
    toast.error(error)
    dispatch(clearErrors())
}


dispatch(getOrderDetails(id))


}, [dispatch,error,id])



  return (
    <Fragment>
  {
    loading? <Loader/>:(

      <Fragment>
      <Helmet title="Order Details" />
     
      <div className="orderDetailsPage">
        {/* left box */}
      
          {/* s1 */}
          <div className="orderDetailsContainer">
            <Typography component="h1" >Order #{order && order._id}</Typography>
            <Typography>Shipping Info</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p>Name:</p>
                <span>{order.user && order.user.name}</span>
              </div>
              <div>
                <p>PhoneNo:</p>
                <span> {order.shippingInfo && order.shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{ order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state} ,${order.shippingInfo.pinCode} ,${order.shippingInfo.country}`   }</span>
              </div>
            
            </div>
              <Typography>Payment</Typography>
               <div className="orderDetailsContainerBox">
                <div>
                  <p className={order.paymentInfo && order.paymentInfo.status ==="succeeded" ? "greenColor" :"redColor"} >
                  {order.paymentInfo && order.paymentInfo.status ==="succeeded" ? "PAID" :"NOT PAID"}
                  </p>

                </div>

                <div>
                  <p>Amount</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
                
               </div>
               <Typography>Order status</Typography>
               <div className="orderDetailsContainerBox">
                <div>
               <p lassName={order.orderStatus && order.orderStatus==="Delivered" ? "greenColor" :"redColor"} >    {order.orderStatus&& order.orderStatus} </p>

                </div>
               </div>
               
                <Typography>Order Items:</Typography>
               <div className="orderDetailsCartItems">
                <div className="orderDetailsCartItemsContainer">
                  {
                    order.orderItems && order.orderItems.map((item)=>(

                      <div key={item.id}  >
                        <img src={item.image} alt="Product" />
                        <Link to ={`/product/${item.product}`} >
                          {item.name}
                        </Link>
                        <span>
                          {item.quantity} X ₹{item.price}= <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))
                  }
                </div>
               </div>

          </div>
       
      </div>
    </Fragment>
    )
  }
    </Fragment>
  )
}

export default OrderDetails