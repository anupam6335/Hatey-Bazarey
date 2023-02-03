import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../../../allComponents";

import { BsQuestionCircle } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearErrors } from "../../../../actions/userActions";

import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );
  useEffect(() => {
      if (error) {
        toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, toast, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("email", email);

    dispatch(forgotPassword(formData));
  };
  return (
    <>
      <MetaData title={"Change Password"} />
      <h2 className="title">Forgot Password</h2>
      <div className="profile__box">
        <div className="LOGIN_BOX">
        <img
            src="https://res.cloudinary.com/hateybazarey/image/upload/v1675351981/forgot_kxjbzx.gif"
            width="520"
            height="540"
            className="video__Login"
            alt="forgot password image"
            draggable="false"
          />

          <form
            className="login register Update_BOX"
            onSubmit={submitHandler}
            encType="multipart/form-data"
            style={{marginLeft: '50px'}}
          >
          <h2 style={{marginBottom: '20px'}}> Forgot Your Password <BsQuestionCircle className="icon" /></h2>
            <div className="form-group">
              <input
                type="email"
                id="email_field"
                className="form-control"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

          

            <input
              type="submit"
              value="Send Email"
              disabled={loading ? true : false}
            />
          </form>

          
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
