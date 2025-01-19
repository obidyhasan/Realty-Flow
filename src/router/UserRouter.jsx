import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import LoadingLayout from "../layouts/LoadingLayout";
import useUser from "../hooks/useUser";
import useAuth from "../hooks/useAuth";

const UserRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const [userInfo, isPendingUser] = useUser();

  if (loading || isPendingUser) {
    return <LoadingLayout></LoadingLayout>;
  }

  if (user && userInfo?.role === "User") {
    return children;
  }

  return <Navigate to={"/login"} replace></Navigate>;
};

UserRouter.propTypes = {
  children: PropTypes.element,
};

export default UserRouter;
