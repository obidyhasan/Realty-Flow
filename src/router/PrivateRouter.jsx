import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingLayout from "../layouts/LoadingLayout";
import PropTypes from "prop-types";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingLayout></LoadingLayout>;
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={location.pathname} replace></Navigate>;
};

PrivateRouter.propTypes = {
  children: PropTypes.element,
};

export default PrivateRouter;
