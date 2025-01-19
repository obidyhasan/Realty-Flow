import { Helmet } from "react-helmet";
import useUser from "../../hooks/useUser";

const Profile = () => {
  const [userInfo] = useUser();

  return (
    <div>
      <Helmet>
        <title>Realty Flow - Profile</title>
      </Helmet>
      <div className="flex my-5 flex-col items-center justify-center gap-4">
        <figure>
          <img
            src={userInfo?.image}
            className="border w-32 h-32 object-cover rounded-full"
            alt=""
          />
        </figure>
        <div className="text-center flex flex-col gap-1 items-center">
          <h1 className="font-bold text-2xl">{userInfo?.name}</h1>
          <p>{userInfo?.email}</p>
          {userInfo?.role !== "User" && (
            <p className="badge">{userInfo?.role}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
