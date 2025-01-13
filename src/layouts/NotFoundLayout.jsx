import Lottie from "lottie-react";
import NotFoundAnimation from "../json/NotFoundAnimation.json";
import { Link } from "react-router-dom";

const NotFoundLayout = () => {
  return (
    <div className="font-poppins px-5 w-full min-h-screen flex items-center justify-center flex-col gap-5 ">
      <Lottie
        className="max-w-lg"
        animationData={NotFoundAnimation}
        loop={true}
      />
      <h1 className="font-bold text-3xl text-center">Page Not Found</h1>
      <Link to={"/"} replace className="btn">
        Go To Home
      </Link>
      ;
    </div>
  );
};

export default NotFoundLayout;
