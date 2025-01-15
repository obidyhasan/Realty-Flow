import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PropTypes from "prop-types";
import NotFoundLayout from "../layouts/NotFoundLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRouter from "./PrivateRouter";
import MainDashboard from "../pages/Dashboard/MainDashboard/MainDashboard";
import Home from "../pages/Home/Home";
import AgentRouter from "./AgentRouter";
import AdminRouter from "./AdminRouter";
import AllProperties from "../pages/AllProperties/AllProperties";

const Router = ({ children }) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <NotFoundLayout></NotFoundLayout>,
      children: [
        {
          path: "/",
          element: <Home></Home>,
        },
        {
          path: "/all-properties",
          element: (
            <PrivateRouter>
              <AllProperties></AllProperties>
            </PrivateRouter>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <PrivateRouter>
              <MainDashboard></MainDashboard>
            </PrivateRouter>
          ),
          children: [
            // User Route
            {
              path: "/dashboard/user/profile",
              element: <h1>User Profile</h1>,
            },
            {
              path: "/dashboard/user/wishlist",
              element: <h1>Wishlist</h1>,
            },
            {
              path: "/dashboard/user/property-bought",
              element: <h1>Property Bought</h1>,
            },
            {
              path: "/dashboard/user/reviews",
              element: <h1>My Reviews</h1>,
            },
            // Agent Router
            {
              path: "/dashboard/agent/profile",
              element: (
                <AgentRouter>
                  <h1>My Profile</h1>
                </AgentRouter>
              ),
            },
            {
              path: "/dashboard/agent/add-property",
              element: (
                <AgentRouter>
                  <h1>Add Property</h1>
                </AgentRouter>
              ),
            },
            {
              path: "/dashboard/agent/added-properties",
              element: (
                <AgentRouter>
                  <h1>My Added Properties</h1>
                </AgentRouter>
              ),
            },
            {
              path: "/dashboard/agent/sold-properties",
              element: (
                <AgentRouter>
                  <h1>My Sold Properties</h1>
                </AgentRouter>
              ),
            },
            {
              path: "/dashboard/agent/requested-properties",
              element: (
                <AgentRouter>
                  <h1>Requested Properties</h1>
                </AgentRouter>
              ),
            },
            // Admin Router
            {
              path: "/dashboard/admin/profile",
              element: (
                <AdminRouter>
                  <h1>Admin Profile</h1>
                </AdminRouter>
              ),
            },
            {
              path: "/dashboard/admin/manage-properties",
              element: (
                <AdminRouter>
                  <h1>Manage Properties</h1>
                </AdminRouter>
              ),
            },
            {
              path: "/dashboard/admin/manage-users",
              element: (
                <AdminRouter>
                  <h1>Manage Users</h1>
                </AdminRouter>
              ),
            },
            {
              path: "/dashboard/admin/manage-reviews",
              element: (
                <AdminRouter>
                  <h1>Manage Reviews</h1>
                </AdminRouter>
              ),
            },
          ],
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
