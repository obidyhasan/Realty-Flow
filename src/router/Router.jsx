import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PropTypes from "prop-types";
import NotFoundLayout from "../layouts/NotFoundLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRouter from "./PrivateRouter";

const Router = ({ children }) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <NotFoundLayout></NotFoundLayout>,
      children: [
        {
          path: "/",
          element: <h1>Home</h1>,
        },
        {
          path: "/all-properties",
          element: (
            <PrivateRouter>
              <h1>All properties</h1>
            </PrivateRouter>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/register",
      element: <Register></Register>,
    },
  ]);

  return <RouterProvider router={router}>{children}</RouterProvider>;
};

Router.propTypes = {
  children: PropTypes.element,
};

export default Router;
