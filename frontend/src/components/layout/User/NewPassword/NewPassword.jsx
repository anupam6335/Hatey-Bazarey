import React, { useState, useEffect } from "react";

import {MetaData} from "../../../allComponents";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../../../actions/userActions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { error, success } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      toast(`${error}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "Dark",
      });
      dispatch(clearErrors());
    }

    if (success) {
      toast(`Password updated successfully`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "Dark",
      });
      navigate("/login");
    }
  }, [dispatch, toast, error, success, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(params.token, formData));
  };

  return (
    <>
      <MetaData title={"New Password Reset"} />

      <h2 className="title">Create New Password</h2>
      <div className="profile__box" >
        <div className="LOGIN_BOX" >
          <form
            className="login register Update_BOX"
            onSubmit={submitHandler}
            encType="multipart/form-data"
            style={{width: '420px'}}
          >

            <div className="form-group">
              <input
                type="password"
                id="password_field"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Set New Password"
            />
          </form>

          <div className="LOGIN_BOX" style={{marginLeft: '5rem'}}>
            <video
              muted
              autoPlay
              loop
              className="video__Login"
              style={{width: '750px', height: '450px'}}
            >
              <source
                src="https://res.cloudinary.com/hateybazarey/video/upload/v1675375055/animated_medium20211108-27044-jnczo0_f1ncg0.mp4"
                type="video/mp4"
              />
              Your browser does not support the video please update the browser.
            </video>
            </div>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
