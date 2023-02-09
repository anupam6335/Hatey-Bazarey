import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import { MetaData, Loader } from "../../components/allComponents";
import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";
import { allOrders, clearErrors } from "../../actions/orderActions";
import { toast } from "react-hot-toast";

const OrdersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, toast, error, navigate]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "No of Items",
          field: "numofItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numofItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <>
            <Link
              to={`/admin/order/${order._id}`}
              className="btns btn-primary py-1 px-2"
            >
              <i className="fa fa-eye"></i>
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
      <MetaData title={"All Orders"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <>
            <h1 className="my-5">All Orders</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setOrders()}
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

export default OrdersList;
