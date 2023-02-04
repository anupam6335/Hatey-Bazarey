import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";

import MetaData from "../../MetaData";
import CheckoutSteps from '../Checkoutsteps/CheckoutSteps'
import '../../User/Login/Login.css';

import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../../../actions/cartActions";

const Shipping = () => {
  const countriesList = Object.values(countries)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo?.address);
  const [city, setCity] = useState(shippingInfo?.city);
  const [postalCode, setPostalCode] = useState(shippingInfo?.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo);
  const [country, setCountry] = useState(shippingInfo?.country);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }));
    navigate("/order/confirm");
  };
  return (
    <>
      <MetaData title={"Shipping Info"} />
      <CheckoutSteps shipping /> 
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
            src="https://res.cloudinary.com/hateybazarey/video/upload/v1675534419/animated_medium20211108-27044-jnczo0_1_lgnbtb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video please update the browser.
        </video>
        <form className="login " onSubmit={submitHandler}>
          <h2>Shipping Info</h2>
          <p>Please Enter valid address</p>
          <input
            type="text"
            id="address_field"
            className="form-control"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            id="city_field"
            className="form-control"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="phone"
            id="phone_field"
            className="form-control"
            placeholder="Phone No"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            required
          />
          <input
            type="number"
            id="postal_code_field"
            className="form-control"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
          <select
            id="country_field"
            className="form-control"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            {countriesList.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          <input type="submit" value="CONTINUE" />
        </form>
      </div>
    </>
  );
};

export default Shipping;
