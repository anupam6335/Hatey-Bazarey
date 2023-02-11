import React, { useEffect, useState } from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Footer,
  Header,
  Login,
  Productdetails,
  Register,
  Profile,
  ProtectedRoute,
  Updateprofile,
  UpdatePassword,
  ForgotPassword,
  NewPassword,
  Cart,
  Shipping,
  ConfirmOrder,
  Payment,
  Success,
} from "./components/allComponents";
import {
  Dashboard,
  Home,
  ListOrders,
  NewProduct,
  OrderDetails,
  OrdersList,
  ProcessOrder,
  ProductReviews,
  ProductsList,
  Shop,
  UpdateProduct,
  UpdateUser,
  UsersList,
} from "./pages/allpages";
import { Toaster } from "react-hot-toast";

import { loadUser } from "./actions/userActions";
import store from "./store";
import axios from "axios";

import { useSelector } from "react-redux";

// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");

      setStripeApiKey(data.stripeApiKey);
    }

    getStripApiKey();
  }, []);

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/shop" element={<Shop />} exact />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" element={<Productdetails />} exact />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} exact />
          <Route
            path="/password/reset/:token"
            element={<NewPassword />}
            exact
          />
          <Route element={<Cart />} path="/cart" exact />
          <Route element={<ProtectedRoute />}>
            <Route element={<Profile />} path="/me" exact />
            <Route element={<Updateprofile />} path="/me/update" exact />
            <Route element={<UpdatePassword />} path="/password/update" exact />
            <Route element={<Shipping />} path="/shipping" exact />
            <Route element={<ConfirmOrder />} path="/order/confirm" exact />

            {stripeApiKey && (
              <Route
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    {/* <Route element={<Payment />} path="/payment" exact /> */}
                    <Payment />
                  </Elements>
                }
                path="/payment"
              />
            )}
            <Route element={<Success />} path="/success" exact />
            <Route element={<ListOrders />} path="/orders/me" exact />
            <Route element={<OrderDetails />} path="/order/:id" exact />

            <Route element={<Dashboard />} path="dashboard" exact />
            <Route element={<ProductsList />} path="admin/products" exact />
            <Route element={<NewProduct />} path="admin/product" exact />
            <Route
              element={<UpdateProduct />}
              path="/admin/product/:id"
              exact
            />
            <Route element={<OrdersList />} path="/admin/orders" exact />
            <Route element={<ProcessOrder />} path="/admin/order/:id" exact />
            <Route element={<UsersList />} path="/admin/users" exact />
            <Route element={<UpdateUser />} path="/admin/user/:id" exact />
            <Route element={<ProductReviews />} path="/admin/reviews" exact />
          </Route>
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
