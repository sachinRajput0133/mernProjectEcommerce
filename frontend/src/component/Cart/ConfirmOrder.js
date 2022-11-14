import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import CheckoutSteps from "./CheckoutSteps";
import "./confirmOrder.css";

const ConfirmOrder = () => {
    const navigate=useNavigate()
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const subTotal = cartItems.reduce(
    (acc, curr) => (acc +curr.quantity * curr.price),
    0
  );
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + shippingCharges + tax;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ,${shippingInfo.pinCode} ,${shippingInfo.country}`;

const proceedToPayment=()=>{
    const data={
        subTotal,
        totalPrice,
        shippingCharges,
        tax
    }
    sessionStorage.setItem("orderInfo",JSON.stringify(data))
    navigate("/process/payment")
}


  return (
    <Fragment>
      <Helmet title="Confirm Order" />
      <div className="checkOut">
        <CheckoutSteps activeStep={1} />
      </div>
      <div className="confirmOrderPage">
        {/* left box */}
        <div>
          {/* s1 */}
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>PhoneNo:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          {/* s2 */}
          <div className="confirmCartItems">
            <Typography>Your Cart Item:</Typography>
            <div className="confirmCartItemContainer">
              {cartItems &&
                cartItems.map((item) => (
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
        <div>
          <div className="orderSummery">
            <Typography>Order Summery</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subTotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button onClick={proceedToPayment} >Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
