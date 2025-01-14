import PropTypes from "prop-types";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState } from "react";

const IMAGE_HOSTING_KEY = import.meta.env.VITE_imgbb_api_key;
const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_KEY}`;

const ImageUpload = ({ imageFile }) => {
  const axiosPublic = useAxiosPublic();
  const [imageUrl, setImageUrl] = useState(null);
  axiosPublic
    .post(IMAGE_HOSTING_API, imageFile, {
      "content-type": "multipart/form-data",
    })
    .then((res) => {
      console.log(res);
      setImageUrl(res.data?.data?.display_url);
    })
    .catch((error) => console.log(error));

  return [imageUrl];
};

ImageUpload.propTypes = {
  imageFile: PropTypes.object,
};

export default ImageUpload;
