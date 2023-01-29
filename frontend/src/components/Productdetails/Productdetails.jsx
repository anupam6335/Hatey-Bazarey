import { useState, useEffect } from "react";
import { Loader } from "../allComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  newReview,
  clearErrors,
} from "../../actions/productActions";
import { MetaData } from "../allComponents";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./Productdetails.css";
const Productdetails = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const matchId = useParams();
  useEffect(() => {
    console.log(matchId);
    dispatch(getProductDetails(matchId.id));
    if (error) {
      toast.error(error);
    }
  }, [dispatch, error, matchId]);

  return (
    <>
      <MetaData title={`${product.name}`} />
      {loading ? (
        <Loader />
      ) : (
        <div id="prodetails" className="section__p1">
          <div className="single__pro_image">
            {product.images &&
              product.images.map((image) => (
                <img
                  className="d-block w-100"
                  src={image.url}
                  alt={product.title}
                  style={{ width: "100%" }}
                  id="MainImg"
                />
              ))}

            {/* <div className="small__img_group">
              <div className="small__img_col">
                <img
                  src="https://res.cloudinary.com/hateybazarey/image/upload/v1674912845/products/s4_pnwgvf.png"
                  alt=""
                  style={{ width: "100%" }}
                  className="small__img"
                />
              </div>
              <div className="small__img_col">
                <img
                  src="https://res.cloudinary.com/hateybazarey/image/upload/v1674912617/products/s3_qwk4b4.jpg"
                  alt=""
                  style={{ width: "100%" }}
                  className="small__img"
                />
              </div>
              <div className="small__img_col">
                <img
                  src="https://res.cloudinary.com/hateybazarey/image/upload/v1674912615/products/s2_byjxpa.webp"
                  alt=""
                  style={{ width: "100%" }}
                  className="small__img"
                />
              </div>
              <div className="small__img_col">
                <img
                  src="https://res.cloudinary.com/hateybazarey/image/upload/v1674912616/products/s1_o6hzyd.jpg"
                  alt=""
                  style={{ width: "100%" }}
                  className="small__img"
                />
              </div>
            </div> */}
          </div>

          <div className="single__pro_details">
            <h6>{product.seller} / T-Shirt</h6>
            <h4>{product.name}</h4>
            <div className="star ratings" style={{ marginTop: "-10px" }}>
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({product.numOfReviews} review)</span>
            </div>

            <h2>${product.price}</h2>
            {/* <select>
              <option>Select Size</option>
              <option>XL</option>
              <option>XXL</option>
              <option>Small</option>
            </select> */}

            <input type="number" max="10" min="1" placeholder="1" />

            <button className={product.stock === 0 ? 'disableBtn': 'btn'} >
            {product.stock === 0 ? 'comming soon' : 'Add To Cart' }
            </button>
            <h4>Product Details</h4>
            <span>{product.description}</span>
            <p style={{ marginTop: "20px" }}>
              Status:{" "}
              <strong className={product.stock > 0 ? "greenColor" : "redColor"}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}{" "}
              </strong>
            </p>
            <div style={{ marginTop: "1rem" }}>
              <p>Submit Your Review</p>
              <div className="review_box">
                <div className="rating">
                  <input type="radio" name="rating" id="r-1" />
                  <label for="r-1"></label>

                  <input type="radio" name="rating" id="r-2" />
                  <label for="r-2"></label>

                  <input type="radio" name="rating" id="r-3" />
                  <label for="r-3"></label>

                  <input type="radio" name="rating" id="r-4" />
                  <label for="r-4"></label>

                  <input type="radio" name="rating" id="r-5" />
                  <label for="r-5"></label>
                </div>
                <textarea
                  name=""
                  id=""
                  cols="60"
                  rows="2"
                  style={{
                    minWidth: "450px",
                    maxWidth: "450px",
                    minHeight: "50px",
                  }}
                  className="textArea"
                ></textarea>
              </div>
              <input
                className="submit__review"
                type="submit"
                value="Submit Review"
                style={{
                  width: "150px",
                  marginTop: "-26rem",
                  marginLeft: "30rem",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Productdetails;
