import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useUser = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const { data: userInfo } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/user/${user?.email}`);
      return res.data;
    },
  });

  return [userInfo];
};

export default useUser;
