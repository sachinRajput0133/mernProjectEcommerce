import { createStore, combineReducers, applyMiddleware } from "redux";
// import {configureStore} from "@reduxjs/toolkit"

import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productByCategoryClothingReducer, productByCategoryElectronicsReducer, productByCategoryShoesReducer, productDetailsReducer,  productReducer,  productReviewsReducer,  productsReducer, reviewReducer } from "./reducers/productReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
    products:productsReducer,
    productByCategoryShoes:productByCategoryShoesReducer,
    productByCategoryElectronics:productByCategoryElectronicsReducer,
    productByCategoryClothing:productByCategoryClothingReducer,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myorders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    product:productReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allusers:allUsersReducer,
    userDetails:userDetailsReducer,
    productReviews:productReviewsReducer,
    review:reviewReducer
    
    
});
let initialState = {
cart:{
  cartItems:  localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  shippingInfo: localStorage.getItem("shippinInfo")? JSON.parse(localStorage.getItem("shippingInfo")):{}
},



};

const middleware = [thunk];


const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
