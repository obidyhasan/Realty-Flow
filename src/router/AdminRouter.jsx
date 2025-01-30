import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import { Navigate, useLocation } from "react-router-dom";
import LoadingLayout from "../layouts/LoadingLayout";

const AdminRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const [userInfo, isPendingUser] = useUser();
  const location = useLocation();
  if (loading || isPendingUser) {
    return <LoadingLayout></LoadingLayout>;
  }

  if (user && userInfo?.role === "Admin") {
    return children;
  }

  return <Navigate to={"/login"} state={location?.pathname} replace></Navigate>;
};

AdminRouter.propTypes = {
  children: PropTypes.element,
};

export default AdminRouter;
