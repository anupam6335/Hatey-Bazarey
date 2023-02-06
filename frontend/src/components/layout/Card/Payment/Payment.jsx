import { useEffect } from "react";

import { MetaData } from "../../../allComponents";
import CheckoutSteps from "../Checkoutsteps/CheckoutSteps";
import "../../User/Login/Login.css";

import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../../../actions/orderActions";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, toast, error]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  // console.log('payment')
  const submitHandler = async (e) => {
    e.preventDefault();
    document.addEventListener("DOMContentLoaded", function (event) {
      document.querySelector("#pay_btn").disabled = true;
    });
    let res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      res = await axios.post("/api/v1/payment/process", paymentData, config);

      const clientSecret = res.data.client_secret;

      // console.log(clientSecret);

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        document.addEventListener("DOMContentLoaded", function (event) {
          document.querySelector("#pay_btn").disabled = false;
        });
      } else {
        // The payment is processed or not
        if (result.paymentIntent.status === "succeeded") {

          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order))
          
          navigate("/success");
        } else {
          toast.error("There is some issue while payment processing");
        }
      }
    } catch (error) {
      document.addEventListener("DOMContentLoaded", function (event) {
        document.querySelector("#pay_btn").disabled = false;
      });
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <MetaData title={"Payment"} />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="LOGIN_BOX">
        <video
          width="520"
          height="440"
          muted
          autoPlay
          loop
          className="video__Login"
        >
          <source
            src="https://res.cloudinary.com/hateybazarey/video/upload/v1675581440/animated_medium20211108-706-13l21c4_lf5lpv.mp4"
            type="video/mp4"
          />
          Your browser does not support the video please update the browser.
        </video>
        <form className="login " onSubmit={submitHandler}>
          <h2>Card Info</h2>
          <p>Please Enter valid card details</p>
          <CardNumberElement
            type="text"
            id="card_num_field"
            className="form-control"
            placeholder="Card Number"
            options={options}
          />
          <CardExpiryElement
            type="text"
            id="card_exp_field"
            className="form-control"
            placeholder="Card Expiry"
            options={options}
          />
          <CardCvcElement
            type="text"
            id="card_cvc_field"
            className="form-control"
            placeholder="Card CVC"
            options={options}
          />

          <input
            type="submit"
            value={` Pay  - $ ${orderInfo && orderInfo.totalPrice} `}
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
