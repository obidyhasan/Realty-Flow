import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
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
