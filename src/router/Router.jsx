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
import AgentProfile from "../pages/Dashboard/Agent/AgentProfile";
import AgentAddProperty from "../pages/Dashboard/Agent/AgentAddProperty";
import AgentAddedProperties from "../pages/Dashboard/Agent/AgentAddedProperties";
import AgentUpdateProperty from "../pages/Dashboard/Agent/AgentUpdateProperty";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import AdminManageProperties from "../pages/Dashboard/Admin/AdminManageProperties";
import AdminManageUsers from "../pages/Dashboard/Admin/AdminManageUsers";
import PropertyDetails from "../pages/PropertyDetails.jsx/PropertyDetails";

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
          path: "/property-details/:id",
          element: (
            <PrivateRouter>
              <PropertyDetails></PropertyDetails>
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
                  <AgentProfile></AgentProfile>
                </AgentRouter>
              ),
            },
            {
              path: "/dashboard/agent/add-property",
              element: (
                <AgentRouter>
                  <AgentAddProperty></AgentAddProperty>
                </AgentRouter>
              ),
            },
            {
              path: "/dashboard/agent/added-properties",
              element: (
                <AgentRouter>
                  <AgentAddedProperties></AgentAddedProperties>
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
            {
              path: "/dashboard/agent/update-property/:id",
              element: (
                <AgentRouter>
                  <AgentUpdateProperty></AgentUpdateProperty>
                </AgentRouter>
              ),
            },
            // Admin Router
            {
              path: "/dashboard/admin/profile",
              element: (
                <AdminRouter>
                  <AdminProfile></AdminProfile>
                </AdminRouter>
              ),
            },
            {
              path: "/dashboard/admin/manage-properties",
              element: (
                <AdminRouter>
                  <AdminManageProperties></AdminManageProperties>
                </AdminRouter>
              ),
            },
            {
              path: "/dashboard/admin/manage-users",
              element: (
                <AdminRouter>
                  <AdminManageUsers></AdminManageUsers>
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
