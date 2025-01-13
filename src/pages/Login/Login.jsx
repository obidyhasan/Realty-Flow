import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const Login = () => {
  return (
    <div className="w-full relative min-h-screen font-poppins flex flex-col md:gap-0 md:flex-row">
      <div className="md:w-3/5">
        <img
          src="https://i.ibb.co.com/ZdCN3Tw/apartment-building-city-with-copy-space.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative md:w-2/5 p-5 flex items-center justify-center">
        {/* Back to Home */}
        <div className="absolute top-0 left-0 p-5 flex gap-3 items-center">
          <Link
            to={"/"}
            className="btn btn-circle bg-primary-light border-none hover:bg-primary"
          >
            <FaArrowLeftLong></FaArrowLeftLong>
          </Link>
          <span className="font-medium">Back To Home</span>
        </div>

        <div className="w-full max-w-sm my-20">
          <h1 className="font-bold text-3xl text-center">Login</h1>
          <form className="mt-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-primary hover:bg-primary-light border-none">
                Login
              </button>
            </div>
          </form>
          <p className="text-center mt-6">
            {"Don't have an account? "}{" "}
            <Link to={"/register"} className="font-semibold underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
