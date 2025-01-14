import { useForm } from "react-hook-form";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, replace, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { showErrorToast, showSuccessToast } from "../../utility/ShowToast";
import { useState } from "react";

const IMAGE_HOSTING_KEY = import.meta.env.VITE_imgbb_api_key;
const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_KEY}`;

const Register = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const { handelUserRegister, handelUserProfile, setLoading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoadingBtn(true);
    await handelUserRegister(data.email, data.password)
      .then((res) => {
        const userUid = res?.user?.uid;

        // Upload image on img-bb server
        const imageFile = { image: data?.image[0] };
        axiosPublic
          .post(IMAGE_HOSTING_API, imageFile, {
            headers: {
              "content-type": "multipart/form-data",
            },
          })
          .then((result) => {
            if (result.data?.success) {
              const delete_image_url = result.data?.data?.delete_url;
              const image_url = result.data?.data?.display_url;

              handelUserProfile({ name: data.name, photo: image_url })
                .then(() => {
                  const userInfo = {
                    name: data.name,
                    image: image_url,
                    userUid,
                    email: data.email,
                    delete_image_url,
                    role: "User",
                  };

                  axiosPublic
                    .post("/api/users", userInfo)
                    .then((res) => {
                      if (res.data.insertedId) {
                        showSuccessToast("Register Successfully");
                        setLoading(false);
                        navigate(
                          location.state ? location.state : "/",
                          replace
                        );
                        setLoadingBtn(false);
                      }
                    })
                    .catch((error) => {
                      setLoading(false);
                      setLoadingBtn(false);
                      console.log(error);
                      showErrorToast("Something went wrong!");
                    });
                })
                .catch((error) => {
                  setLoading(false);
                  setLoadingBtn(false);
                  console.log(error);
                  showErrorToast(error.message);
                });
            }
          })
          .catch((error) => {
            setLoading(false);
            setLoadingBtn(false);
            showErrorToast("Something went wrong!");
            console.log(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        setLoadingBtn(false);
        showErrorToast(error.message);
        console.log(error);
      });
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
                {...register("image", { required: true })}
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
              <button
                disabled={loadingBtn ? true : false}
                className="btn bg-primary hover:bg-primary-light border-none disabled:bg-primary disabled:text-dark-01"
              >
                {loadingBtn ? (
                  <>
                    <span className="loading loading-spinner"></span> Register
                  </>
                ) : (
                  "Register"
                )}
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
