import { Button, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, getOrderDetails, upadteOrder } from "../../actions/orderAction";
import Loader from "../Loader/Loader";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import "./ProcessOrder.css"
import MetaData from "../MetaData";
import Sidebar from "./Sidebar";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";




const ProcessOrder = (e) => {
    const {order ,loading,error}=useSelector(state=>state.orderDetails)
    const { error:updateError, isUpdated}=useSelector(state=>state.order)
    const [status, setStatus] = useState("")
 const {id}=useParams()
 const dispatch=useDispatch()

const updateOrderSubmitHandler=(e)=>{
    e.preventDefault()
    const myForm=new FormData()
    myForm.set("status",status)
    dispatch(upadteOrder(id,myForm))
};

    useEffect(() => {
        if(error){
            toast.error(error)
            dispatch(clearErrors())
        }
        if(updateError){
            toast.error(updateError)
            dispatch(clearErrors())
        }
        
        if(isUpdated){
            toast.success("Order Updated Successfully")
            dispatch({type:UPDATE_ORDER_RESET})
        }
        
        
        dispatch(getOrderDetails(id))
        
        
        }, [dispatch,error,id,isUpdated,updateError])





  return (

     <Fragment>

    <MetaData title="Process order"/>
    <div className="dashboard">
        <Sidebar/>
    <div className="newProductContainer">
       {
        loading ? <Loader/> :(
            <div className="confirmOrderPage"
            
            style={{display:order.orderStatus==="Delivered"? "block":"grid"}}
            >
            {/* left box */}
            <div>
              {/* s1 */}
              <div className="confirmShippingArea">
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
                   <p className={order.orderStatus && order.orderStatus==="Delivered" ? "greenColor" :"redColor"} >    {order.orderStatus&& order.orderStatus} </p>
    
                    </div>
                   </div>
              </div>
    
              {/* s2 */}
              <div className="confirmCartItems">
                <Typography>Your Cart Item:</Typography>
                <div className="confirmCartItemContainer">
                  {order.orderItems &&
                    order?.orderItems?.map((item) => (
                      <div key={item.id} className="div">
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                        <span>
                          {item.quantity} X ₹{item.price}=
                          <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
    
            {/* right box*/}
            <div  style={{display:order.orderStatus==="Delivered"? "none":"block"}}  >
            <form action="" 
            onSubmit={updateOrderSubmitHandler}
            className='updateOrderForm'
            encType='mltipart/form-data'
            
            >
              
                        <h1>Process Order</h1>
                       <div>
                            <AccountTreeIcon/>
                            <select  onChange={(e)=>setStatus(e.target.value)}   >
                                <option value="">Choose Category</option>
                               {
                                order.orderStatus ==="Processing" &&  <option value="Shipped">Shipped</option>
                               }
                               {
                                order.orderStatus==="Shipped" && <option value="Delivered">Delivered</option>

                               }
                                
                              


                            </select>
                       </div>
                      
                   

                      
                          <Button
                          id='createProductBtn'
                          type='submit'
                        
                          disabled={loading? true : false || status === "" ? true:false }
                          >Process</Button>
               




            </form>
            </div>
          </div>
        )
       }
    </div>
    </div>
   </Fragment>
   
      
     
  
  );
};



export default ProcessOrder