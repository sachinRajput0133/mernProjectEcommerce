import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addItemsToCart } from "../../actions/cartAction";
import "./Cart.css";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CartItemCard from "./CartItemCard.js";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [grossTotal, setGrossTotal] = useState(0);
  const navigate = useNavigate();

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (quantity >= stock) return toast.error("Limited Product Stock");
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1)
      return toast.error("Minimum 1 Product quantity Required");

    dispatch(addItemsToCart(id, newQty));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };

// const removeAllHandler=()=>{
//   dispatch(removeAllItemsFromCart())
// }

  useEffect(() => {
    setGrossTotal(
      cartItems?.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
    );
  }, [cartItems]);

  return (
    <Fragment>
      {cartItems?.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>No Product In Your Cart</Typography>
          <Link to="/products">View products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
            {cartItems &&
              cartItems.map((item) => (
                <div key={item.id} className="cartContainer">
                  <CartItemCard item={item} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id, item.quantity, item.stock)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      readOnly={true}
                    />
                    <button
                      onClick={() =>
                        increaseQuantity(item.id, item.quantity, item.stock)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubTotal">{`₹${
                    item.price * item.quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                <p>{`₹${grossTotal}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>Check Out</button>
                {/* <button onClick={()=>removeAllHandler()}>Remove all</button> */}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
