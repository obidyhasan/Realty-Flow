import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PropTypes from "prop-types";
import NotFoundLayout from "../layouts/NotFoundLayout";

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
      ],
    },
  ]);

  return <RouterProvider router={router}>{children}</RouterProvider>;
};

Router.propTypes = {
  children: PropTypes.element,
};

export default Router;
