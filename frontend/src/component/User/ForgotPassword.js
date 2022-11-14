import React, { Fragment, useEffect } from "react";
import "./ForgotPassword.css";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearErrors, forgotPassword } from "../../actions/userAction";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

import MetaData from "../MetaData";

const ForgotPassword = () => {
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    // const myForm = new FormData();
    // myForm.set("email", email);
    // console.log(myForm)
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
    }
  }, [error, message, dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forget Password</h2>
              <form
                action=""
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="signUpPassword">
                  <MailOutlineOutlinedIcon />
                  <input
                    type="email"
                    name="email"
                    id=""
                    required
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                  // disabled={loading? true :false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ForgotPassword;
