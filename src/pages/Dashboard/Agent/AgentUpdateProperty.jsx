import { useForm } from "react-hook-form";
import TitleSection from "../../../components/TitleSection";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { showErrorToast, showSuccessToast } from "../../../utility/ShowToast";
import { Helmet } from "react-helmet";

const IMAGE_HOSTING_KEY = import.meta.env.VITE_imgbb_api_key;
const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_KEY}`;

const AgentUpdateProperty = () => {
  const [uploading, setUploading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [imageChange, setImageChange] = useState(false);
  const { user } = useAuth();
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();

  const {
    data: property = {},
    isError,
    error,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["property", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/property/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (!isPending && property) {
      reset({
        title: property?.title || "",
        location: property?.location || "",
        min: property?.priceRange?.min || "",
        max: property?.priceRange?.max || "",
        name: user?.displayName || "",
        email: user?.email || "",
        description: property?.description || "",
      });
    }
  }, [isPending, reset, property, user]);

  if (isError) {
    console.log(error);
  }

  const onSubmit = async (data) => {
    setUploading(true);

    let image_url;
    if (imageChange) {
      const imageFile = { image: data?.image[0] };
      try {
        const result = await axiosPublic.post(IMAGE_HOSTING_API, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        if (result.data.success) {
          image_url = result.data?.data?.display_url;
        }
      } catch (error) {
        console.log(error);
        showErrorToast(error.message);
        setUploading(false);
      }
    } else {
      image_url = property?.image;
    }
    const updatePropertyInfo = {
      image: image_url,
      title: data.title,
      location: data.location,
      priceRange: {
        min: parseFloat(data.min),
        max: parseFloat(data.max),
      },
      description: data.description,
    };

    axiosSecure
      .patch(`/api/property/${id}`, updatePropertyInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          setUploading(false);
          showSuccessToast("Update successfully");
          refetch();
        } else {
          setUploading(false);
          showErrorToast("Nothing change!");
        }
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error.message);
        setUploading(false);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Realty Flow - Update Properties</title>
      </Helmet>
      <div className="my-5">
        <TitleSection
          title={"Modify Property Details"}
          description={
            "Make changes to your property details, ensuring your listing stays accurate and up-to-date."
          }
        ></TitleSection>
      </div>
      <div className="mt-14">
        {isPending ? (
          <div className="my-10 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Property Title</span>
                </label>
                <input
                  {...register("title")}
                  type="text"
                  placeholder="title"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Property Location</span>
                </label>
                <input
                  {...register("location")}
                  type="text"
                  placeholder="location"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Property Image</span>
                </label>
                <input
                  {...register("image")}
                  onChange={() => setImageChange(true)}
                  type="file"
                  className="file-input file-input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price Range</span>
                </label>
                <div className="flex gap-4">
                  <input
                    {...register("min")}
                    type="number"
                    placeholder="min"
                    className="input input-bordered w-full"
                    required
                  />
                  <input
                    {...register("max")}
                    type="number"
                    placeholder="max"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              </div>
            </div>
            {/* Agent Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Agent Name</span>
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  required
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Agent Email</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  readOnly
                  required
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Property Description</span>
              </label>

              <textarea
                {...register("description")}
                className="textarea textarea-bordered min-h-28"
                required
                placeholder="description"
              ></textarea>
            </div>
            <button
              disabled={uploading ? true : false}
              className="mt-5 btn bg-primary hover:bg-primary-light border-none disabled:bg-primary disabled:text-dark-01"
            >
              {uploading ? (
                <>
                  <span className="loading loading-spinner"></span> Updating
                  Property
                </>
              ) : (
                "Update Property"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AgentUpdateProperty;
