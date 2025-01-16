import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllProperties = () => {
  const axiosSecure = useAxiosSecure();

  const { data: properties = [], isPending } = useQuery({
    queryKey: ["all-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/all-properties");
      return res.data;
    },
  });

  return [properties, isPending];
};

export default useAllProperties;
