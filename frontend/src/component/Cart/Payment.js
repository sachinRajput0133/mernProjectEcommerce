import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../MetaData";
import CheckoutSteps from "./CheckoutSteps";
import "./Payment.css";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Typography } from "@mui/material";
import { useRef } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../actions/userAction";
import { createOrder } from "../../actions/orderAction";
import { removeAllItemsFromCart } from "../../actions/cartAction";

const Payment = () => {

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const {error} = useSelector((state) => state.newOrder);
  const {cartItems} = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false)
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
 const dispatch=useDispatch()
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const paymentData ={
    amount:Math.round(orderInfo.totalPrice *100)
  }

const order={
  shippingInfo,
  orderItems:cartItems,
  itemPrice:orderInfo.subTotal,
  taxPrice:orderInfo.tax,
  shippingPrice:orderInfo.shippingCharges,
  totalPrice:orderInfo.totalPrice
}

  // stripe payment
  const submitHandler = async (e) => {
    e.preventDefault()

    const config = {
      headers: {
        "Content-Type": "application/json",
       
      },
    };
    try {
     setLoading(true)
      const { data } = await axios.post(
        "/api/v1/process/payment",
        paymentData,
        config
      );


      const client_secret = data.client_secret;
    
   if(!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
    
        // payBtn.current.disabled = false;
        setLoading(false)
        toast.error(result.error.message);
      } else {
       
        if (result.paymentIntent.status === "succeeded") {
            // push order before payment
            order.paymentInfo={
              id:result.paymentIntent.id,
              status:result.paymentIntent.status
            }
             dispatch(createOrder(order))
             setLoading(false)
            //  localStorage.setItem("cartItems",[])
            // localStorage.removeItem("cartItems")
            
          navigate("/success");
          dispatch(removeAllItemsFromCart())
        }
      }
    } catch (error) {
       
      // payBtn.current.disabled = false;
      setLoading(false)
      
      toast.error(error.response.data.message);
    }
  };

  // clearerrors

useEffect(() => {
 if(error){
  toast.error(error)
  dispatch(clearErrors())
 }
}, [dispatch,error])



  return (
    <Fragment>
      <MetaData titlee="Payment" />
      <div className="checkOut">
        <CheckoutSteps activeStep={2} />
      </div>

      <div className="paymentContainer">
        <form action="" className="paymentForm" onSubmit={submitHandler}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            name=""
            id=""
            disabled={loading   }
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className={!loading ? "paymentFromBtnActive" : "paymentFromBtnDisabled"}
          /> 
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
