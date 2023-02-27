import React from "react";
import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";
import "../../pages/Home/Featureproduct.css";
import "../../pages/Home/Home.css";
const Banner = () => {
  return (
    <>
      <div className="container">
        <div class="gallery">
          <div style={{ position: "relative", cursor: "pointer" }}>
            <Link to="/product/63e44c993b623af4c66b1862">
              <img
                style={{ position: "absolute" }}
                src="/assets/banner/HEROecom8.png"
                alt=""
                height="100%"
                width="100%"
              />
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <Link to={`/product/63e44c993b623af4c66b1858`}>
              <img
                style={{ position: "absolute" }}
                src="https://res.cloudinary.com/hateybazarey/image/upload/v1674741172/products/headphone_with_girl_geyvtd.webp"
                alt=""
                height="100%"
                width="100%"
              />
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <img
              style={{ position: "absolute" }}
              src="/assets/banner/HEROecom2.png"
              alt=""
              height="100%"
              width="100%"
            />
          </div>
          <div style={{ position: "relative" }}>
            <Link to="/product/63e44c993b623af4c66b185a">
              <img
                style={{ position: "absolute" }}
                src="/assets/banner/HEROecom4.jpg"
                alt=""
                height="100%"
                width="100%"
              />
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <Link to="/product/63e44c993b623af4c66b1863">
              <img
                style={{ position: "absolute" }}
                src="/assets/banner/HEROecom6.jpg"
                alt=""
                height="100%"
                width="100%"
              />
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <Link to="/product/63f012bedd5088bb769cf309">
              <img
                style={{ position: "absolute" }}
                src="/assets/banner/HEROecom5.png"
                alt=""
                height="100%"
                width="100%"
              />
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <img
              style={{ position: "absolute" }}
              src="/assets/banner/HEROecom.jpg"
              alt=""
              height="100%"
              width="100%"
            />
          </div>
          <div style={{ position: "relative" }}>
            <Link to="/product/63e44c993b623af4c66b1856">
              <img
                style={{ position: "absolute" }}
                src="/assets/banner/HEROecom10.png"
                alt=""
                height="100%"
                width="100%"
              />
            </Link>
          </div>
          <div style={{ position: "relative" }}>
            <Link to="/product/63f1ed8901836094cedc6cc8">
              <img
                style={{ position: "absolute" }}
                src="/assets/banner/HEROecom7.png" // bat
                alt=""
                height="100%"
                width="100%"
              />
            </Link>
          </div>
        </div>
      </div>

    </>
  );
};

export default Banner;
