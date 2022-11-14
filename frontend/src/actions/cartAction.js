import axios from "axios";
import { ADD_TO_CART, REMOVE_ALL_CART_ITEM, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";


export const addItemsToCart = (id, quantity) => async (dispatch,getState) => {
    
    
  
      const { data } = await axios.get(
        `/api/v1/product/${id}`,
       
      );
    console.log(data)
      dispatch({
        type: ADD_TO_CART,
        payload:{
         id:data.product._id,
         name:data.product.name,
         price:data.product.price,
         image:data.product.images[0].url,
         stock:data.product.stock,
         quantity,
       }
      });

localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))

   
  };
// RemoveFrom Cart

  export const removeItemsFromCart = (id) => async (dispatch,getState) => {

       dispatch({
        type:REMOVE_CART_ITEM,
        payload:id,
       })

       localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
  }

  
// Removeall items From Cart

  export const removeAllItemsFromCart = () => async (dispatch,getState) => {

       dispatch({
        type:REMOVE_ALL_CART_ITEM,
      
       })

       localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
  }

  


// Save Shipping info
export const saveShippingInfo=(data)=>(dispacth)=>{
  dispacth({
    type:SAVE_SHIPPING_INFO,
    payload:data
  })
  localStorage.setItem("shippingInfo",JSON.stringify(data))
}