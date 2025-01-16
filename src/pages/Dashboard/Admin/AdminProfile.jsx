import useUser from "../../../hooks/useUser";

const AdminProfile = () => {
  const [userInfo] = useUser();

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-3">
        <figure>
          <img
            src={userInfo.image}
            className="border w-36 h-36 object-cover rounded-full"
            alt=""
          />
        </figure>
        <div className="text-center flex flex-col gap-1 items-center">
          <h1 className="font-bold text-2xl">{userInfo.name}</h1>
          <p>{userInfo.email}</p>
          <p className="badge">{userInfo.role}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
