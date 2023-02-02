import "../Login/Login.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../../../allComponents";

import { FaUserCircle } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../../../constants/userConstants";
import { toast } from "react-hot-toast";

const Updateprofile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("profile updated successfully");
      dispatch(loadUser());
      navigate("/me");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, toast, navigate, error, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };

  const onChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <MetaData title={"Update Profile"} />
      <h2 className="title">Edit your Profile</h2>
      <div className="profile__box">
        <div className="LOGIN_BOX">
          <form
            className="login register Update_BOX"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h2><FaUserCircle className="icon" /> Hi, {user?.name} </h2>
            <label style={{ textAlign: "center", fontWeight: "bold" }}>
              {user.role === "admin" ? "( Admin )" : ""}
            </label>
            <div className="form-group">
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group avatar_div">
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                      style={{ width: "100px" }}
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="assets/userAvatar/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose your profile pic
                  </label>
                </div>
              </div>
            </div>

            <input
              type="submit"
              value="Update"
              disabled={loading ? true : false}
            />
          </form>

          <img
            src="https://res.cloudinary.com/hateybazarey/image/upload/v1675327743/image_processing20230201-31279-1a43vmw_swv7ca.gif"
            width="520"
            height="440"
            className="video__Login"
            alt="update profile animation"
            draggable='false'
          />
        </div>
      </div>
    </>
  );
};

export default Updateprofile;
