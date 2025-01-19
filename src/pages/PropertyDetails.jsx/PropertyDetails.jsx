import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";
import { showErrorToast, showSuccessToast } from "../../utility/ShowToast";
import useAuth from "../../hooks/useAuth";
import { useRef, useState } from "react";
import ReactStars from "react-rating-stars-component";
import useUser from "../../hooks/useUser";
import TitleSection from "../../components/TitleSection";
import PropertyReview from "../../components/PropertyReview";
import { Helmet } from "react-helmet";

const PropertyDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useAuth();
  const reviewModal = useRef();
  const [userInfo] = useUser();
  const [rating, setRating] = useState(null);

  const { data: property = {} } = useQuery({
    queryKey: ["property"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/property/${id}`);
      return res.data;
    },
  });

  const {
    data: reviews = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["property-review", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/reviews/property/${id}`);
      return res.data;
    },
  });

  console.log(reviews);

  function handelAddToWishlist() {
    const propertyInfo = {
      propertyId: property?._id,
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL,
    };

    axiosSecure
      .post("/api/wishlist", propertyInfo)
      .then((res) => {
        if (res.data.insertedId) {
          showSuccessToast("Added to wishlist");
        }
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error.message);
      });
  }

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  function handelRatingSubmit(e) {
    e.preventDefault();

    const date = new Date();
    const reviewInfo = {
      rating: rating,
      review: e.target.review.value,
      reviewerName: user?.displayName,
      reviewerEmail: user?.email,
      reviewerImage: user?.photoURL,
      propertyId: property?._id,
      reviewTimestamp: date.getTime(),
      title: property?.title,
    };

    axiosSecure
      .post("/api/reviews", reviewInfo)
      .then((res) => {
        if (res.data.insertedId) {
          showSuccessToast("Added review successfully");
          reviewModal.current.close();
          refetch();
        }
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error.message);
      });
  }

  return (
    <div>
      <Helmet>
        <title>Realty Flow - Property Details</title>
      </Helmet>

      <div className="max-w-screen-2xl mx-auto py-10 px-5">
        {/* <div className="border border-base-200 p-5 rounded-md"></div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <figure className="">
            <img
              src={property?.image}
              className="w-full h-full rounded-lg"
              alt=""
            />
          </figure>
          <div className="flex flex-col justify-center">
            <div className="flex flex-col gap-4">
              <p className="badge">{property?.verificationStatus}</p>
              <div className="space-y-2">
                <h1 className="font-semibold text-2xl">{property?.title}</h1>
                <h2 className="text-sm font-medium flex flex-wrap text-gray-600 items-center gap-2">
                  <FaLocationArrow className="text-primary"></FaLocationArrow>{" "}
                  <span>{property?.location}</span>
                </h2>
              </div>

              <div className="flex">
                <p className="font-bold text-xl">
                  $ {property?.priceRange?.min} - {property?.priceRange?.max}
                </p>
              </div>
              <div>
                <p className="font-semibold text-xl">Description</p>
                <p className="mt-2">{property?.description}</p>
              </div>
              <div className="space-y-4">
                <hr className="border-base-200 mt-2" />
                <div className="flex gap-3 items-center">
                  <img
                    src={property?.agent?.image}
                    className="w-10 h-10 object-cover rounded-full"
                    alt=""
                  />
                  <h2 className="font-semibold">{property?.agent?.name}</h2>
                </div>
              </div>
              {userInfo?.role === "User" && (
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handelAddToWishlist}
                    className="btn bg-primary border-none hover:bg-primary-light"
                  >
                    <BiHeart className="text-xl"></BiHeart> Add to wishlist
                  </button>
                  <button
                    onClick={() => reviewModal.current.showModal()}
                    className="btn bg-updateColor border-none "
                  >
                    Add a Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <section className="max-w-screen-2xl mx-auto px-5">
        <div className="my-10">
          <TitleSection
            title={"Customer Reviews"}
            description={
              "Discover honest reviews from our users about their experiences."
            }
          ></TitleSection>
          <div className="my-10">
            {isPending ? (
              <div className="my-10 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div>
                {reviews.length ? (
                  <div className="mt-10 grid grid-cols-1 gap-5">
                    {reviews.map((review) => (
                      <PropertyReview
                        key={review?._id}
                        userReview={review}
                      ></PropertyReview>
                    ))}
                  </div>
                ) : (
                  <div className="text-center font-semibold text-xl border p-4 rounded-md border-base-200">
                    <h1>There are no reviews for this property.</h1>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" ref={reviewModal} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-xl text-center">Add a Review</h3>
            <hr />
            <div className="flex justify-center">
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={30}
                activeColor="#ffd700"
              />
            </div>
            <form onSubmit={handelRatingSubmit} className="space-y-2">
              <textarea
                required
                name="review"
                className="min-h-24 textarea textarea-bordered w-full"
                placeholder="enter your review"
              ></textarea>

              <div className="text-center">
                <button
                  disabled={rating === null ? true : false}
                  className="btn w-full bg-primary border-none hover:bg-primary-light"
                >
                  Add Review
                </button>
              </div>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default PropertyDetails;
