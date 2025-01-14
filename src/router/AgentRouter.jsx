import { useState } from "react";
import useUser from "../hooks/useUser";
import LoadingLayout from "../layouts/LoadingLayout";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const AgentRouter = ({ children }) => {
  const { user, loading } = useState();
  const [userInfo, isPendingUser] = useUser();
  const location = useLocation();

  if (loading || isPendingUser) {
    return <LoadingLayout></LoadingLayout>;
  }

  if (user && userInfo.role === "Agent") {
    return children;
  }

  return <Navigate to={"/login"} state={location.pathname} replace></Navigate>;
};

AgentRouter.propTypes = {
  children: PropTypes.element,
};

export default AgentRouter;
