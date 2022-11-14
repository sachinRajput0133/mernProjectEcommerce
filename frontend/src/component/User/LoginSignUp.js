import React, { Fragment, useEffect, useRef } from "react";
import "./LoginSignUp.css";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link,  useLocation,  useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login , clearErrors, register } from "../../actions/userAction";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";


const LoginSignUp = () => {
  const loginTab = useRef(null);
  const location=useLocation()
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {loading,isAuthenticated,error}=useSelector(state=>state.user)
 
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;
  const [avatar, setAvatar] = useState();
  const[avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail,loginPassword))
   
   
  };





  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
 
    dispatch(register(myForm))
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
    switcherTab.current.classList.remove("shiftToRight");

    registerTab.current.classList.remove("shiftToNeutralForm");
 loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
 
  const redirect=location.search? location.search.split("=")[1]:""
 
useEffect(() => {
  if(error){
    toast.error(error)
    dispatch(clearErrors())
  }
  if( isAuthenticated  ){
      navigate(`/${redirect}`)
  }


 
}, [dispatch,error,navigate,isAuthenticated,redirect])



  return (
    <Fragment>
      {
        loading? <Loader/> :(
          <div className="loginSignUpContainer">
        <div className="loginSignUpBox">
          <div>
            <div className="login_signup_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form
            action=""
            ref={loginTab}
            onSubmit={loginSubmit}
            className="loginForm"
          >
            <div className="loginEmail">
              <MailOutlineOutlinedIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                name=""
                id=""
                value={loginPassword}
                placeholder="Password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>

            <Link to="/password/forgot">Forget Password ?</Link>

            <input type="submit" value="Login" className="loginBtn" />
          </form>
          <form
            action=""
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
            <MailOutlineOutlinedIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <MailOutlineOutlinedIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <LockOpenIcon />
              <input
                type="password"
                name="password"
                id=""
                value={password}
                placeholder="Password"
                onChange={registerDataChange}
              />
            </div>
            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                id=""
                placeholder="No file chosen"
                onChange={registerDataChange}
              />
            </div>
            <input
              type="submit"
              value="Register"
              className="signUpBtn"
              // disabled={loading? true :false}
            />
          </form>
        </div>
      </div>
        )
      }
    </Fragment>
  );
};

export default LoginSignUp;
