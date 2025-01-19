import { useForm } from "react-hook-form";
import TitleSection from "../../../components/TitleSection";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { showErrorToast, showSuccessToast } from "../../../utility/ShowToast";
import { useState } from "react";
import useUser from "../../../hooks/useUser";
import { Helmet } from "react-helmet";

const IMAGE_HOSTING_KEY = import.meta.env.VITE_imgbb_api_key;
const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_KEY}`;

const AgentAddProperty = () => {
  const { user } = useAuth();
  const [userInfo] = useUser();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    setUploading(true);
    const imageFile = { image: data?.image[0] };
    axiosPublic
      .post(IMAGE_HOSTING_API, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((result) => {
        if (result.data.success) {
          const image_url = result.data?.data?.display_url;

          const propertyInfo = {
            image: image_url,
            title: data.title,
            location: data.location,
            description: data.description,
            priceRange: {
              min: parseFloat(data.min),
              max: parseFloat(data.max),
            },
            agent: {
              name: user?.displayName,
              email: user?.email,
              image: user?.photoURL,
            },
            verificationStatus: "Pending",
          };

          axiosSecure
            .post("/api/properties", propertyInfo)
            .then((res) => {
              if (res.data.insertedId) {
                setUploading(false);
                reset();
                showSuccessToast("Property added successfully");
              }
            })
            .catch((error) => {
              console.log(error);
              showErrorToast("Something went wrong!");
              setUploading(false);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setUploading(false);
        showErrorToast("Something went wrong!");
      });
  };

  return (
    <div>
      <Helmet>
        <title>Realty Flow - Add Property</title>
      </Helmet>
      <div className="my-5">
        <TitleSection
          title={"Add Your Property"}
          description={
            "Make your property available to millions of potential buyers and renters. Simply provide the details, and we’ll do the rest!"
          }
        ></TitleSection>
      </div>
      <div className="mt-14">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
                type="file"
                className="file-input file-input-bordered w-full"
                required
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
                defaultValue={user?.displayName}
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
                defaultValue={user?.email}
                placeholder="email"
                className="input input-bordered"
                readOnly
                required
              />
            </div>
          </div>
          {/* Description */}
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
          {userInfo?.status === "Fraud" ? (
            <button
              disabled={true}
              className="mt-5 btn bg-primary hover:bg-primary-light border-none  disabled:text-dark-01"
            >
              Add Your Property
            </button>
          ) : (
            <button
              disabled={uploading ? true : false}
              className="mt-5 btn bg-primary hover:bg-primary-light border-none disabled:bg-primary "
            >
              {uploading ? (
                <>
                  <span className="loading loading-spinner"></span> Adding Your
                  Property
                </>
              ) : (
                "Add Your Property"
              )}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AgentAddProperty;
