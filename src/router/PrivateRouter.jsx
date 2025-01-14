import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingLayout from "../layouts/LoadingLayout";
import PropTypes from "prop-types";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingLayout></LoadingLayout>;
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} replace></Navigate>;
};

PrivateRouter.propTypes = {
  children: PropTypes.element,
};

export default PrivateRouter;
