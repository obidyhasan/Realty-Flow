import { NavLink, Outlet } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import LoadingLayout from "../../../layouts/LoadingLayout";

const MainDashboard = () => {
  const [userInfo, isPendingUser] = useUser();
  const role = userInfo?.role;

  const userLink = (
    <div className="flex flex-col gap-3">
      <NavLink
        to={"/dashboard/profile"}
        className={({ isActive }) =>
          isActive ? "underline text-dark-01 font-medium" : "text-gray-600"
        }
      >
        My Profile
      </NavLink>
      <NavLink
        to={"/dashboard/user/wishlist"}
        className={({ isActive }) =>
          isActive ? "underline text-dark-01 font-medium" : "text-gray-600"
        }
      >
        Wishlist
      </NavLink>
      <NavLink
        to={"/dashboard/user/property-bought"}
        className={({ isActive }) =>
          isActive ? "underline text-dark-01 font-medium" : "text-gray-600"
        }
      >
        Property Bought
      </NavLink>
      <NavLink
        to={"/dashboard/user/reviews"}
        className={({ isActive }) =>
          isActive ? "underline text-dark-01 font-medium" : "text-gray-600"
        }
      >
        My Reviews
      </NavLink>
    </div>
  );

  const agentLink = (
    <div className="flex flex-col gap-3">
      <NavLink
        to={"/dashboard/profile"}
        className={({ isActive }) =>
          isActive ? "underline text-dark-01 font-medium" : "text-gray-600"
        }
      >
        My Profile
      </NavLink>
      <NavLink
        to={"/dashboard/agent/add-property"}
        className={({ isActive }) =>
          isActive ? "underline text-dark-01 font-medium" : "text-gray-600"
        }
      >
        Add Property
      </NavLink>
      <NavLink
        to={"/dashboard/agent/added-properties"}
        className={({ isActive }) =>
          isActive ? "underline text-dark-01 font-medium" : "text-gray-600"
        }
      >
        My Added Properties
      </NavLink>
      <NavLink
        to={"/dashboard/agent/sold-properties"}
        className={({ isActive }) =>
          isActive ? "underline text-dark-01 font-medium" : "text-gray-600"
        }
      >
        My Sold Properties
      </NavLink>
      <NavLink
        to={"/dashboard/agent/requested-properties"}
        className={({ isActive }) =>
          isActive ? "underline text-dark-01 font-medium" : "text-gray-600"
        }
      >
        Requested Properties
      </NavLink>
    </div>
  );

  const adminLink = (
    <div className="flex flex-col gap-3">
      <NavLink
        to={"/dashboard/profile"}
        className={({ isActive }) =>
          isActive ? "underline text-dark-01 font-medium" : "text-gray-600"
        }
      >
        My Profile
      </NavLink>
      <NavLink
        to={"/dashboard/admin/manage-properties"}
        className={({ isActive }) =>
          isActive ? "underline text-dark-01 font-medium" : "text-gray-600"
        }
      >
        Manage Properties
      </NavLink>
      <NavLink
        to={"/dashboard/admin/manage-users"}
        className={({ isActive }) =>
          isActive ? "underline text-dark-01 font-medium" : "text-gray-600"
        }
      >
        Manage Users
      </NavLink>
      <NavLink
        to={"/dashboard/admin/manage-reviews"}
        className={({ isActive }) =>
          isActive ? "underline text-dark-01 font-medium" : "text-gray-600"
        }
      >
        Manage Reviews
      </NavLink>
      <NavLink
        to={"/dashboard/admin/advertise-property"}
        className={({ isActive }) =>
          isActive ? "underline text-dark-01 font-medium" : "text-gray-600"
        }
      >
        Advertise Property
      </NavLink>
    </div>
  );

  if (isPendingUser) {
    return <LoadingLayout></LoadingLayout>;
  }

  return (
    <div>
      <div className="max-w-screen-2xl mx-auto p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div className="rounded-md p-4 h-min border border-base-200">
            {role === "User" && userLink}
            {role === "Agent" && agentLink}
            {role === "Admin" && adminLink}
          </div>
          <div className="md:col-span-1  lg:col-span-2 xl:col-span-3 border border-base-200 rounded-md p-5">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
