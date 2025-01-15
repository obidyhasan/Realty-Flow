import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const ImageUpload = (imageFile) => {
  const axiosPublic = useAxiosPublic();
  const API_KEY = import.meta.env.VITE_imgbb_api_key;
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    axiosPublic
      .post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((result) => {
        if (result.data?.success) {
          // const delete_image_url = result.data?.data?.delete_url;
          const image_url = result.data?.data?.display_url;
          setImageUrl(image_url);
          console.log(image_url);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [API_KEY, axiosPublic, imageFile]);

  return imageUrl;
};
