import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full min-h-screen font-poppins flex flex-col md:gap-0 md:flex-row">
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
          <h1 className="font-bold text-3xl text-center">Create Account</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 flex flex-col gap-2"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                {...register("photo", { required: true })}
                required
                type="file"
                className="file-input file-input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/,
                })}
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              {errors.password?.type === "pattern" && (
                <label className="label text-red-500 text-xs">
                  Password must be less than 6 characters, include at least one
                  uppercase letter, and one special character.
                </label>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-primary hover:bg-primary-light border-none">
                Register
              </button>
            </div>
          </form>
          <p className="text-center mt-6">
            {"Already have an account? "}{" "}
            <Link to={"/login"} className="font-semibold underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
