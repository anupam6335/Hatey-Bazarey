import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Loader, MetaData } from "../../../allComponents";

import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../../../actions/userActions";

import { toast } from "react-hot-toast";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
    
  const redirect = location.search ? '/shipping' : '/'
  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated,toast, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(email, " -- ", password);
    dispatch(login(email, password));
  };
  return (
    <>
      <MetaData title={"Login"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="LOGIN_BOX">
            <video
              width="520"
              height="440"
              muted
              autoPlay
              loop
              className="video__Login"
            >
              <source
                src="https://res.cloudinary.com/hateybazarey/video/upload/v1675173131/login_wdk1gi.mp4"
                type="video/mp4"
              />
              Your browser does not support the video please update the browser.
            </video>
            <form className="login " onSubmit={submitHandler}>
              <h2>Welcome to Hatey Bazarey</h2>
              <p>Please log in to order your fav products</p>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="submit" value="Log In" />
              <div className="links">
                <Link to="/password/forgot" style={{color: 'black', textDecoration: 'none', fontWeight: 'bold'}} className='Link'>Forgot Password?</Link>

                <Link to="/register"style={{color: 'black', textDecoration: 'none', fontWeight: 'bold'}}>Don't have an Account</Link>
              </div> 
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
