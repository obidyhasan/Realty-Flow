import { useQuery } from "@tanstack/react-query";
import TitleSection from "../../../components/TitleSection";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { MdDelete } from "react-icons/md";
import { showErrorToast, showSuccessToast } from "../../../utility/ShowToast";
import { showConfirmDialog } from "../../../utility/SweetAlert";
import { Helmet } from "react-helmet";

const AdminManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/users");
      return res.data;
    },
  });

  function handelMakeAdmin(id) {
    showConfirmDialog("Are you want to make it admin?", "Make admin").then(
      (res) => {
        if (res.isConfirmed) {
          axiosSecure
            .patch(`/api/users/role/${id}`, { role: "Admin" })
            .then((res) => {
              if (res.data.modifiedCount) {
                refetch();
                showSuccessToast("Make it admin done");
              }
            })
            .catch((error) => {
              console.log(error);
              showErrorToast(error.message);
            });
        }
      }
    );
  }
  function handelMakeAgent(id) {
    showConfirmDialog("Are you want to make it agent?", "Make agent").then(
      (res) => {
        if (res.isConfirmed) {
          axiosSecure
            .patch(`/api/users/role/${id}`, { role: "Agent" })
            .then((res) => {
              if (res.data.modifiedCount) {
                refetch();
                showSuccessToast("Make it agent done");
              }
            })
            .catch((error) => {
              console.log(error);
              showErrorToast(error.message);
            });
        }
      }
    );
  }

  function handelMarkAsFraud(user) {
    showConfirmDialog("Are you want to make it fraud?", "Make Fraud").then(
      (res) => {
        if (res.isConfirmed) {
          axiosSecure
            .patch(`/api/users/status/${user?.email}`, { status: "Fraud" })
            .then((res) => {
              if (res.data.matchedCount) {
                refetch();
                showSuccessToast("Mark as fraud successfully");
              }
            })
            .catch((error) => {
              console.log(error);
              showErrorToast(error.message);
            });
        }
      }
    );
  }

  function handelUserDelete(user) {
    showConfirmDialog("Are you want to delete this user?", "Delete it").then(
      (res) => {
        if (res.isConfirmed) {
          axiosSecure
            .delete(`/api/users?id=${user?._id}&uid=${user?.userUid}`)
            .then((res) => {
              if (res.data.deletedCount) {
                refetch();
                showSuccessToast("Delete user successfully");
              }
            })
            .catch((error) => {
              console.log(error);
              showErrorToast(error.message);
            });
        }
      }
    );
  }

  return (
    <div>
      <Helmet>
        <title>Realty Flow - Manage Users</title>
      </Helmet>
      <TitleSection
        title={"Manage Users Efficiently"}
        description={
          "Easily manage users with tools to view, update roles, verify accounts, and ensure platform security."
        }
      ></TitleSection>

      <div className="mt-10 mb-5">
        {isPending ? (
          <div className="my-10 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div>
            {users.length ? (
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Make Admin</th>
                      <th>Make Agent</th>
                      <th>Mark as fraud</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, idx) => (
                      <tr key={user._id}>
                        <th>{idx + 1}</th>
                        <td className="text-base font-semibold">
                          {user?.name}
                        </td>
                        <td>{user?.email}</td>
                        <td>
                          {user?.status === "Fraud" ? (
                            <p className="badge badge-lg">{user?.status}</p>
                          ) : (
                            <div>
                              {user?.role !== "Admin" ? (
                                <button
                                  onClick={() => handelMakeAdmin(user?._id)}
                                  className="btn btn-sm text-xs"
                                >
                                  Make Admin
                                </button>
                              ) : (
                                <p className="badge badge-lg">{user?.role}</p>
                              )}
                            </div>
                          )}
                        </td>
                        <td>
                          {user?.status === "Fraud" ? (
                            <p className="badge badge-lg">{user?.status}</p>
                          ) : (
                            <div>
                              {user?.role !== "Agent" ? (
                                <button
                                  onClick={() => handelMakeAgent(user?._id)}
                                  className="btn btn-sm text-xs"
                                >
                                  Make Agent
                                </button>
                              ) : (
                                <p className="badge badge-lg">{user?.role}</p>
                              )}
                            </div>
                          )}
                        </td>
                        <td>
                          {user?.role === "Agent" &&
                          user?.status !== "Fraud" ? (
                            <button
                              onClick={() => handelMarkAsFraud(user)}
                              className="btn btn-sm text-xs"
                            >
                              Mark as Fraud
                            </button>
                          ) : (
                            ""
                          )}
                        </td>
                        <td>
                          <button
                            onClick={() => handelUserDelete(user)}
                            className="btn btn-sm text-xs btn-error"
                          >
                            <MdDelete className="text-lg text-white"></MdDelete>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center font-semibold text-xl border p-4 rounded-md border-base-200">
                <h1>Users Not Found</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminManageUsers;
