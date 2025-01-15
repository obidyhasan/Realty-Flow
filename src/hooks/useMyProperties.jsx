import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: properties = [],
    isError,
    error,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["myProperties", user?.email],
    queryFn: async () => {
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
