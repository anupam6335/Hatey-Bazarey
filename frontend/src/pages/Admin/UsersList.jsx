import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import { MetaData, Loader } from "../../components/allComponents";
import Sidebar from "./Sidebar";

import { Toast, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, clearErrors } from "../../actions/userActions";

const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, toast, navigate]);

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,

        actions: (
          <>
            <Link
              to={`/admin/user/${user._id}`}
              className="btns btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button className="btns btn-danger py-1 px-2 ml-2">
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return data;
  };

  return (
    <>
      <MetaData title={"All Users"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
            <h1 className="my-5">All Users</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setUsers()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default UsersList;
