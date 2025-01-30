import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://realty-flow-server.vercel.app",
});

const useAxiosSecure = () => {
  const { handelUserLogout } = useAuth();
  const navigate = useNavigate();

  // add a request interceptor
  axiosSecure.interceptors.request.use(
    (config) => {
      // do something before request is sent
      // request interceptor to add authorization header for every secure call to the api
      const token = localStorage.getItem("access-token");

      if (!token) {
        // if token is not available, you can return a rejected promise
        // or delay the API call until the token is available
        return Promise.reject("Token not available yet");
      }

      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      // do something with request error
      return Promise.reject(error);
    }
  );

  // add a response interceptor
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await handelUserLogout();
        navigate("/login");
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
