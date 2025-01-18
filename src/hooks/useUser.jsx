import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo, isPending: isPendingUser } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (user?.email) {
        const res = await axiosSecure.get(`/api/user/${user?.email}`);
        return res.data;
      }
      return {};
    },
  });

  return [userInfo, isPendingUser];
};

export default useUser;
