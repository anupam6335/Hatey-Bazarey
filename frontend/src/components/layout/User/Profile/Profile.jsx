import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { MetaData, Loader } from "../../../allComponents";

import "./Profile.css";
const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}-profile`} />
          <h2 className="title">My Profile</h2>
          <div className="profile__box">
            <div className="profile__img">
              <figure className="avatar avatar__profile">
                <img
                  className="rounded-circle img-fluid"
                  src={user.avatar?.url}
                  alt={user.name}
                  style={{width: '100%'}}
                />
              </figure>
              <div className="changing__style">
                <Link
                  to="/me/update"
                  id="edit_profile"
                  className="btns"
                  style={{ textDecoration: "none", fontWeight: 'bold', color: 'black' }}
                >
                  Edit Profile
                </Link>
                <Link
                  to="/password/update"
                  className="btns change__password"
                  style={{ textDecoration: "none", fontWeight: 'bold', color: 'black' }}
                >
                  Change Password
                </Link>
              </div>
            </div>
            <div className="profile__details">
              <h4 className="profile__details_title">Full Name</h4>
              <p className="profile__details_title_info">{user.name}</p>

              <h4 className="profile__details_title">Email Address</h4>
              <p className="profile__details_title_info">{user.email}</p>

              <h4 className="profile__details_title">Joined On</h4>
              <p className="profile__details_title_info">{String(user.createdAt).substring(0, 10)}</p>

              {user.role !== "admin" && (
                <Link to="/orders/me" className="btns order__btn"
                  style={{ textDecoration: "none", fontWeight: 'bold', color: 'black' }}>
                  My Orders
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
