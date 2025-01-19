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
import AgentAddProperty from "../pages/Dashboard/Agent/AgentAddProperty";
import AgentAddedProperties from "../pages/Dashboard/Agent/AgentAddedProperties";
import AgentUpdateProperty from "../pages/Dashboard/Agent/AgentUpdateProperty";
import AdminManageProperties from "../pages/Dashboard/Admin/AdminManageProperties";
import AdminManageUsers from "../pages/Dashboard/Admin/AdminManageUsers";
import PropertyDetails from "../pages/PropertyDetails.jsx/PropertyDetails";
import UserWishlist from "../pages/Dashboard/User/UserWishlist";
import MakeAnOffer from "../pages/Dashboard/User/MakeAnOffer";
import UserPropertyBought from "../pages/Dashboard/User/UserPropertyBought";
import AgentRequestedProperties from "../pages/Dashboard/Agent/AgentRequestedProperties";
import UserCheckout from "../pages/Dashboard/User/UserCheckout";
import AgentSoldProperties from "../pages/Dashboard/Agent/AgentSoldProperties";
import UserMyReviews from "../pages/Dashboard/User/UserMyReviews";
import Profile from "../pages/Profile/Profile";
import AdminManageReviews from "../pages/Dashboard/Admin/AdminManageReviews";
import AdminAdvertiseProperty from "../pages/Dashboard/Admin/AdminAdvertiseProperty";
import UserRouter from "./UserRouter";

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
              path: "/dashboard/profile",
              element: (
                <PrivateRouter>
                  <Profile></Profile>
                </PrivateRouter>
              ),
            },
            {
              path: "/dashboard/user/wishlist",
              element: (
                <UserRouter>
                  <UserWishlist></UserWishlist>
                </UserRouter>
              ),
            },
            {
              path: "/dashboard/user/make-an-offer/:id",
              element: (
                <UserRouter>
                  <MakeAnOffer></MakeAnOffer>
                </UserRouter>
              ),
            },
            {
              path: "/dashboard/user/property-bought",
              element: (
                <UserRouter>
                  <UserPropertyBought></UserPropertyBought>
                </UserRouter>
              ),
            },
            {
              path: "/dashboard/user/checkout/:id",
              element: (
                <UserRouter>
                  <UserCheckout></UserCheckout>
                </UserRouter>
              ),
            },
            {
              path: "/dashboard/user/reviews",
              element: (
                <UserRouter>
                  <UserMyReviews></UserMyReviews>
                </UserRouter>
              ),
            },
            // Agent Router
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
                  <AgentSoldProperties></AgentSoldProperties>
                </AgentRouter>
              ),
            },
            {
              path: "/dashboard/agent/requested-properties",
              element: (
                <AgentRouter>
                  <AgentRequestedProperties></AgentRequestedProperties>
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
                  <AdminManageReviews></AdminManageReviews>
                </AdminRouter>
              ),
            },
            {
              path: "/dashboard/admin/advertise-property",
              element: (
                <AdminRouter>
                  <AdminAdvertiseProperty></AdminAdvertiseProperty>
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
