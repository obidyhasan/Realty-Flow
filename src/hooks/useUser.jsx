import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: userInfo, isPending: isPendingUser } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/user/${user?.email}`);
      return res.data;
    },
  });

  return [userInfo, isPendingUser];
};

export default useUser;
