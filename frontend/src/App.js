import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { loadUser } from "./actions/userAction";
import "./App.css";
import Cart from "./component/Cart/Cart";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import Shipping from "./component/Cart/Shipping";
import Footer from "./component/Footer/Footer";
import Header from "./component/Header/Header";
import UserOptions from "./component/Header/UserOptions";
import Home from "./component/Home/Home";
// import Loader from "./component/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
// import ProtectedRoute from "./component/Route/ProtectedRoute";
import ForgotPassword from "./component/User/ForgotPassword";
import LoginSignUp from "./component/User/LoginSignUp";
import Profile from "./component/User/Profile";
import ResetPassword from "./component/User/ResetPassword";
import UpdatePassword from "./component/User/UpdatePassword";
import UpdateProfile from "./component/User/UpdateProfile";
import {
  

Elements,

} from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import PageNotFound from "./component/Layout/NotFound/PageNotFound";
import Contact from "./component/Layout/Contact/Contact";
import About from "./component/Layout/About/About";
import ProtectedRoute from "./component/Route/ProtectedRoute"

import BotNavigation from "./component/BottomNavigation/BottomNavigation";
import SearchHeader from "./component/Header/SearchHeader";
import BottomNevigationRoute from "./component/Route/BottomNevigationRoute";

function App() {

  const dispatch=useDispatch()
  const {isAuthenticated ,user,}=useSelector(state=>state.user)
  const [stripeApiKey,setStripeApiKey]=useState("")
  const options = {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "light",
  };

const getStripeApiKey=async()=>{
  const {data}=await axios.get("/api/v1/stripeapikey")
      setStripeApiKey(data.stripeApiKey)
// console.log(data)
}

// console.log(stripeApiKey)

useEffect(() => {
 
dispatch(loadUser())
getStripeApiKey()
}, [dispatch])



  return (
    <>
      <Header />
      {
        isAuthenticated && <UserOptions user={user} />
      }
      <Routes>
        <Route exact path="/" element={<>   <div className="searchContainer"><SearchHeader /></div>  <Home />  <BotNavigation />  </>} />
  
        <Route exact path="/product/:id" element={<BottomNevigationRoute><ProductDetails /> </BottomNevigationRoute>} />
        <Route exact path="/products" element={<BottomNevigationRoute><Products/> </BottomNevigationRoute> } />
        <Route exact path="/products/:keyword" element={<Products/>} />
        <Route exact path="/search" element={ <> <BottomNevigationRoute><Search/> </BottomNevigationRoute>    </> } />
        <Route exact path="/login" element={   <LoginSignUp/>} />
        <Route exact path="/account" element={ <ProtectedRoute> <BottomNevigationRoute> <Profile/></BottomNevigationRoute>   </ProtectedRoute> } />
        <Route exact path="/updatemyprofile" element={ <ProtectedRoute>  <UpdateProfile/></ProtectedRoute> } />
        <Route exact path="/password/update" element={ <ProtectedRoute> <UpdatePassword/></ProtectedRoute> } />
        <Route exact path="/password/forgot" element={<><ForgotPassword/><BotNavigation />   </>  } />
        <Route exact path="/password/reset/:token" element={ <ResetPassword/>   } />
        <Route exact path="/cart" element={ <BottomNevigationRoute><Cart/> </BottomNevigationRoute> } />
        <Route exact path="/shipping" element={ <ProtectedRoute isAuthenticated={isAuthenticated}  > <Shipping/></ProtectedRoute> } />
        <Route exact path="/order/confirm" element={ <ProtectedRoute> <ConfirmOrder/></ProtectedRoute> } />
      {
        stripeApiKey && (<Route exact path="/process/payment" element={ <ProtectedRoute>
          <Elements stripe={ loadStripe(stripeApiKey)}  >
           <Payment  />
           </Elements  >
           </ProtectedRoute> } />

        )
      }
        <Route exact path="/success" element={ <ProtectedRoute> <OrderSuccess/></ProtectedRoute> } />
        <Route exact path="/orders" element={ <ProtectedRoute><BottomNevigationRoute> <MyOrders/></BottomNevigationRoute></ProtectedRoute> } />
        <Route exact path="/order/:id" element={ <ProtectedRoute> <OrderDetails/></ProtectedRoute> } />
      

          <Route exact path="/admin/dashboard" element={   <ProtectedRoute  isAdmin={true}  >  <Dashboard/></ProtectedRoute> } />
       
         
       
        <Route exact path="/admin/products" element={ <ProtectedRoute isAdmin={true} > <ProductList/></ProtectedRoute> } />
        <Route exact path="/admin/product" element={ <ProtectedRoute isAdmin={true} > <NewProduct/></ProtectedRoute> } />
        <Route exact path="/admin/product/:id" element={ <ProtectedRoute isAdmin={true} > <UpdateProduct/></ProtectedRoute> } />
        <Route exact path="/admin/orders" element={ <ProtectedRoute isAdmin={true} > <OrderList/></ProtectedRoute> }  />
        <Route exact path="/admin/order/:id" element={ <ProtectedRoute isAdmin={true} > <ProcessOrder/></ProtectedRoute> }  />
        <Route exact path="/admin/users" element={ <ProtectedRoute isAdmin={true} > <UsersList/></ProtectedRoute> }  />
        <Route exact path="/admin/user/:id" element={ <ProtectedRoute isAdmin={true} > <UpdateUser/></ProtectedRoute> }  />
        <Route exact path="/admin/reviews" element={ <ProtectedRoute isAdmin={true} > <ProductReviews/></ProtectedRoute> }  />
        <Route exact path="/contact" element={  <Contact/> }  />
        <Route exact path="/about" element={  <About/> }  />
        <Route exact path="*" element={  <PageNotFound/> }  />
       
  
        
      </Routes>
     
      <Footer/>
      <ToastContainer {...options} />
    </>
  );
}

export default App;
