import { Link, useNavigate } from "react-router-dom";
import { MetaData } from "../../../allComponents";

import { RiLockPasswordLine } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../../../constants/userConstants";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.user);
  useEffect(() => {
    
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    
    if (isUpdated) {
      toast.success("Password updated successfully");

      navigate("/me");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, toast, error, navigate, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);

    dispatch(updatePassword(formData));
  };
  return (
    <>
      <MetaData title={"Change Password"} />
      <h2 className="title">Change Password</h2>
      <div className="profile__box">
        <div className="LOGIN_BOX">
          <form
            className="login register Update_BOX"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
           <h2 style={{marginBottom: '20px'}}><RiLockPasswordLine className="icon" /> Reset Your Password </h2>
            <div className="form-group">
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Change"
              disabled={loading ? true : false}
            />
          </form>

          <img
            src="https://res.cloudinary.com/hateybazarey/image/upload/v1675333274/password_h0f0qr.avif"
            width="520"
            height="440"
            className="video__Login"
            alt="forgot password image"
            style={{marginLeft: '25px'}}
            draggable="false"
          />
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
