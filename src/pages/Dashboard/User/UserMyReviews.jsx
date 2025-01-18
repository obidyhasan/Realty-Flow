import { useQuery } from "@tanstack/react-query";
import TitleSection from "../../../components/TitleSection";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UserReviewCard from "../../../components/UserReviewCard";

const UserMyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["my-reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/reviews/${user?.email}`);
      return res.data;
    },
  });

  console.log(reviews);

  return (
    <div>
      <div className="my-5">
        <TitleSection
          title={"My Reviews"}
          description={
            "Browse and manage feedback you've received from buyers and clients."
          }
        ></TitleSection>
      </div>
      <div className="my-10">
        {isPending ? (
          <div className="my-10 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div>
            {reviews.length ? (
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {reviews.map((review) => (
                  // todo:
                  <UserReviewCard
                    key={review?._id}
                    review={review}
                    refetch={refetch}
                  ></UserReviewCard>
                ))}
              </div>
            ) : (
              <div className="text-center font-semibold text-xl border p-4 rounded-md border-base-200">
                <h1>No Reviews</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMyReviews;
