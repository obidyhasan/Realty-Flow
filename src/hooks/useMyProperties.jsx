import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useUser from "./useUser";

const useMyProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo] = useUser();

  const {
    data: properties = [],
    isError,
    error,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["myProperties", user?.email],
    queryFn: async () => {
      if (userInfo?.role !== "Agent") {
        return [];
      }
      const res = await axiosSecure.get(`/api/properties/${user?.email}`);
      return res.data;
    },
  });

  if (isError) {
    console.log(error);
  }

  return [properties, isPending, refetch];
};

export default useMyProperties;
