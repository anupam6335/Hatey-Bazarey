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
} from "./components/allComponents";
import { Home } from "./pages/allpages";
import { Toaster } from "react-hot-toast";

import { loadUser } from "./actions/userActions";
import store from "./store";
import axios from "axios";

import { useSelector } from "react-redux";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" element={<Productdetails />} exact />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/me" element={<Profile/>} /> */}

          <Route element={<ProtectedRoute />}>
            <Route  element={<Profile />} path="/me" exact/>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
