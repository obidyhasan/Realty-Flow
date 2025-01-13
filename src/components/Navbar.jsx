import { Link, NavLink } from "react-router-dom";
import logo from "../assets/favicon.ico";

const Navbar = () => {
  const navbarMenuLinks = (
    <div className="text-base flex flex-col lg:flex-row lg:gap-5 gap-2">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive
            ? " underline-offset-2 text-dark-01 font-medium"
            : "text-gray-600"
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"/all-properties"}
        className={({ isActive }) =>
          isActive
            ? " underline-offset-2 text-dark-01 font-medium"
            : "text-gray-600"
        }
      >
        All properties
      </NavLink>
    </div>
  );

  return (
    <div className="bg-white sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-5">
        <div className="navbar px-0 py-3 flex justify-between">
          <div className="">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="lg:hidden mr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-4 shadow"
              >
                {navbarMenuLinks}
              </ul>
            </div>
            <Link className="flex items-center gap-2">
              <img src={logo} className="hidden sm:flex" alt="" />
              <span className="text-2xl font-bold text-dark-01">
                Realty Flow
              </span>
            </Link>
          </div>
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navbarMenuLinks}</ul>
          </div>
          <div className="">
            <Link
              to={"/login"}
              className="btn rounded-full px-6 bg-primary-light border-none hover:bg-primary"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
