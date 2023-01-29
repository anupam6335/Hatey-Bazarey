import React from "react";
import "./Loader.css";
const Loader = () => {
  return (
    <>
      <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <div className="shadow"></div>
        <span>please wait a few sec.. :)</span>
      </div>
    </>
  );
};

export default Loader;
