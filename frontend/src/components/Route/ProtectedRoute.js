import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  return (
    <>
      {isAuthenticated ? <Outlet /> :  <Navigate to="/login" />}
      {isAdmin === true && user.role !== "admin" && <Navigate to="/" />}
    </>
  );
};

export default ProtectedRoute;
