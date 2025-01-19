import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { showErrorToast, showSuccessToast } from "../../utility/ShowToast";
import SocialLogin from "../../components/SocialLogin";
import { Helmet } from "react-helmet";

const Login = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { handelUserLogin, setLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setLoadingBtn(true);
    handelUserLogin(data.email, data.password)
      .then(() => {
        showSuccessToast("Login Successfully");
        navigate(location?.state ? location?.state : "/", { replace: true });
        setLoading(false);
        setLoadingBtn(false);
      })
      .catch((error) => {
        setLoadingBtn(false);
        setLoading(false);
        console.log(error);
        showErrorToast(error.message);
      });
  };

  return (
    <div className="w-full relative min-h-screen font-poppins flex flex-col md:gap-0 md:flex-row">
      <Helmet>
        <title>Realty Flow - Login</title>
      </Helmet>
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

        <div className="w-full max-w-sm mt-20 mb-16">
          <h1 className="font-bold text-3xl text-center">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email")}
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
                {...register("password", { pattern: /^.{6,}$/ })}
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              {errors.password?.type === "pattern" && (
                <label className="label text-xs text-red-500">
                  Password must be at least 6 characters long.
                </label>
              )}
            </div>
            <div className="form-control mt-6">
              <button
                disabled={loadingBtn ? true : false}
                className="btn bg-primary hover:bg-primary-light border-none disabled:bg-primary disabled:text-dark-01"
              >
                {loadingBtn ? (
                  <>
                    <span className="loading loading-spinner"></span> Login
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <p className="text-center mt-6">
            {"Don't have an account? "}{" "}
            <Link to={"/register"} className="font-semibold underline">
              Register
            </Link>
          </p>

          <section className="">
            <SocialLogin></SocialLogin>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
