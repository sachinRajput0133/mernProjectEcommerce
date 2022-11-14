import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../MetaData'
import Loader from "../Loader/Loader";
import "./Profile.css"
const Profile = () => {
    const {loading,user}=useSelector(state=> state.user)
  return (
   <Fragment>
    {
        loading? <Loader/> : <Fragment>
        <MetaData title={`${user.name} 's Profile` }/>
    <div className="profileContainer">
       <div className="profilePik">
           <h1>My Profile</h1>
           <img className='profileImage' src={user?.avatar?.url} alt="" />
           <Link to="/updatemyprofile" >Edit Profile</Link>
       </div>
       <div className='profileDescription' >
           <div>
               <h4>Full Name</h4>
               <p>{user.name}</p>
           </div>
           <div>
               <h4>Email</h4>
               <p>{user.email}</p>

           </div>
           <div>
               <h4>Joined On</h4>
               <p>{String(user.createdAt).substring(0,10)}</p>
           </div>
           <div  className='rightLinkDiv' >
               <Link to="/orders">My Orders</Link>
               <Link to="/password/update" >Change Password</Link>
           </div>
       </div>
    </div>
   </Fragment>
    }
   </Fragment>
  )
}

export default Profile