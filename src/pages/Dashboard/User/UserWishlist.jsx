import { useQuery } from "@tanstack/react-query";
import TitleSection from "../../../components/TitleSection";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import WishlistCard from "../../../components/WishlistCard";
import { Helmet } from "react-helmet";

const UserWishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: wishlists = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`api/wishlist/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>Realty Flow - Wishlist</title>
      </Helmet>
      <div className="my-5">
        <TitleSection
          title={"Wishlist"}
          description={
            "Save and manage your favorite properties in one place for easy access and future planning."
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
            {wishlists.length ? (
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {wishlists.map((item) => (
                  <WishlistCard
                    key={item._id}
                    refetch={refetch}
                    wishlistPropertyId={item._id}
                    property={item.propertyDetails[0]}
                  ></WishlistCard>
                ))}
              </div>
            ) : (
              <div className="text-center font-semibold text-xl border p-4 rounded-md border-base-200">
                <h1>Wishlist is empty</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserWishlist;
