import { FaGoogle } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import { showErrorToast, showSuccessToast } from "../utility/ShowToast";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { handelGoogleLogin, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  function handelGoogleButton() {
    handelGoogleLogin()
      .then((result) => {
        const userInfo = {
          name: result.user.displayName,
          image: result.user.photoURL,
          userUid: result.user.uid,
          email: result.user.email,
          delete_image_url: null,
          role: "User",
        };

        axiosPublic
          .post("/api/users", userInfo)
          .then((res) => {
            navigate(location.state ? location.state : "/", { replace: true });
            showSuccessToast("Sign up Successfully");
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
            showErrorToast(error.message);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        showErrorToast(error.message);
      });
  }

  return (
    <div>
      <div className="divider my-5">Or</div>
      <button onClick={handelGoogleButton} className="btn btn-outline w-full">
        <FaGoogle></FaGoogle> Sign up with Google
      </button>
    </div>
  );
};

export default SocialLogin;
