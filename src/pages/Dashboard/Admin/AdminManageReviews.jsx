import ManageReviewCard from "../../../components/ManageReviewCard";
import TitleSection from "../../../components/TitleSection";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const AdminManageReviews = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: reviews = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/reviews");
      return res.data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>Realty Flow - Manage Reviews</title>
      </Helmet>
      <div className="my-5">
        <TitleSection
          title={"Manage Reviews"}
          description={
            "Easily view, delete user reviews to ensure feedback remains relevant and appropriate."
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
                  <ManageReviewCard
                    key={review?._id}
                    review={review}
                    refetch={refetch}
                  ></ManageReviewCard>
                ))}
              </div>
            ) : (
              <div className="text-center font-semibold text-xl border p-4 rounded-md border-base-200">
                <h1>Reviews Not Found</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageReviews;
