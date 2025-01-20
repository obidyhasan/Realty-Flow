import { useForm } from "react-hook-form";
import TitleSection from "../../../components/TitleSection";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { showErrorToast, showSuccessToast } from "../../../utility/ShowToast";
import { Helmet } from "react-helmet";

const MakeAnOffer = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: item = [], isPending } = useQuery({
    queryKey: ["makeAnOffer", user?.email, id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/wishlist/offer/${id}`);
      return res.data;
    },
  });

  const property = item[0]?.propertyDetails[0];

  useEffect(() => {
    if (!isPending && item) {
      reset({
        title: property?.title || "",
        location: property?.location || "",
        agentName: property?.agent?.name || "",
        buyerName: user?.displayName || "",
        buyerEmail: user?.email || "",
      });
    }
  }, [isPending, reset, item, user, property]);

  const onSubmit = (data) => {
    setUploading(true);
    const offerInfo = {
      ...data,
      propertyId: property?._id,
      offerAmount: parseInt(data.offerAmount),
      status: "Pending",
      agentEmail: property?.agent?.email,
      image: property?.image,
    };
    axiosSecure
      .post("/api/makeOffer", offerInfo)
      .then((res) => {
        if (res.data.insertedId) {
          showSuccessToast("Make an offer done");
          setUploading(false);
          navigate("/dashboard/user/property-bought", { replace: true });
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
        <title>Realty Flow - Make An Offer</title>
      </Helmet>
      <div className="my-5">
        <TitleSection
          title={"Make An Offer"}
          description={
            "Negotiate your price and secure your dream property with ease."
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
                readOnly
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
                readOnly
              />
            </div>
          </div>

          {/* Agent Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Agent Name</span>
              </label>
              <input
                {...register("agentName")}
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
                <span className="label-text">Offer Amount</span>
              </label>
              <input
                {...register("offerAmount", {
                  min: property?.priceRange?.min,
                  max: property?.priceRange?.max,
                })}
                type="number"
                placeholder="offer amount"
                className="input input-bordered"
                required
              />
              {(errors.offerAmount?.type === "min" ||
                errors.offerAmount?.type === "max") && (
                <label className="label text-xs text-red-500">
                  Offer amount is out of range
                </label>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Buyer Email</span>
              </label>
              <input
                {...register("buyerEmail")}
                type="email"
                placeholder="title"
                className="input input-bordered"
                required
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Buyer Name</span>
              </label>
              <input
                {...register("buyerName")}
                type="text"
                placeholder="location"
                className="input input-bordered"
                required
                readOnly
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Buying Date</span>
            </label>
            <input
              {...register("buyingDate")}
              type="date"
              placeholder="date"
              className="input input-bordered"
              required
            />
          </div>
          <button
            disabled={uploading ? true : false}
            className="mt-5 btn bg-primary hover:bg-primary-light border-none disabled:bg-primary "
          >
            {uploading ? (
              <>
                <span className="loading loading-spinner"></span> Make an Offer
              </>
            ) : (
              "Make an Offer"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeAnOffer;
