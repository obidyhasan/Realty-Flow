import { useQuery } from "@tanstack/react-query";
import Headline from "../../../components/Headline";
import LatestReviewCard from "../../../components/LatestReviewCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const LatestReviewSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [], isPending } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/latest/reviews");
      return res.data;
    },
  });

  return (
    <div className="max-w-screen-2xl mx-auto my-10 px-5">
      <div className="">
        <Headline
          headline={"User Feedback"}
          subHeadline={"Explore genuine feedback from our satisfied customers."}
        ></Headline>
      </div>

      {/* all properties card */}
      <div>
        {isPending ? (
          <div className="my-20 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div>
            {reviews.length ? (
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {reviews.map((review) => (
                  <LatestReviewCard
                    key={review?._id}
                    review={review}
                  ></LatestReviewCard>
                ))}
              </div>
            ) : (
              <div className="mt-10 text-center font-semibold text-xl border p-4 rounded-md border-base-200">
                <h1>Reviews Not Found</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestReviewSection;
