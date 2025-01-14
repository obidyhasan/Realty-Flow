import useUser from "../hooks/useUser";
import LoadingLayout from "../layouts/LoadingLayout";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AgentRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const [userInfo, isPendingUser] = useUser();

  if (loading || isPendingUser) {
    return <LoadingLayout></LoadingLayout>;
  }

  if (user && userInfo?.role === "Agent") {
    return children;
  }

  return <Navigate to={"/login"} replace></Navigate>;
};

AgentRouter.propTypes = {
  children: PropTypes.element,
};

export default AgentRouter;
