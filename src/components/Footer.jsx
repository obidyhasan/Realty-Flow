import logo from "../assets/logo.png";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-primary-light">
      <div className="max-w-screen-2xl mx-auto px-4 py-10">
        <div className="flex justify-center">
          <h1 className="flex flex-col justify-center items-center gap-2">
            <img src={logo} className="w-12 h-12 " alt="" />
            <span className="text-2xl font-bold text-dark-01">Realty Flow</span>
            <p className="text-center text-sm max-w-4xl text-gray-600">
              RealtyFlow: A comprehensive real estate platform that simplifies
              property buying, selling, and renting. Effortlessly explore
              properties, make offers, and manage transactions all in one place.
            </p>
          </h1>
        </div>
        <div className="flex justify-center items-center mt-4">
          <div className="flex gap-4 items-center justify-center border border-primary text-xl py-2 px-3 rounded-full w-max">
            <FaFacebook className="transform hover:scale-125 duration-300 cursor-pointer" />
            <FaInstagram className="transform hover:scale-125 duration-300 cursor-pointer" />
            <FaLinkedinIn className="transform hover:scale-125 duration-300 cursor-pointer" />
            <FaXTwitter className="transform hover:scale-125 duration-300 cursor-pointer" />
          </div>
        </div>
        <p className="text-center text-sm mt-8 -mb-3">
          &#169; Realty Flow 2025. All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
