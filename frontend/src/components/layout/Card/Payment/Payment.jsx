import { useEffect } from "react";

import { MetaData } from "../../../allComponents";
import CheckoutSteps from "../Checkoutsteps/CheckoutSteps";
import "../../User/Login/Login.css";

import { useDispatch, useSelector } from "react-redux";

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

  useEffect(() => {
  }, []);
  console.log('payment')
  const submitHandler = async (e) => {
   
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
            value={` Pay `}
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
