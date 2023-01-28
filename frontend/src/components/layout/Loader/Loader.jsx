import React from "react";
import "./Loader.css";
const Loader = () => {
  return (
    <>
      <div class="wrapper">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <span>please wait a few sec.. :)</span>
      </div>
    </>
  );
};

export default Loader;
