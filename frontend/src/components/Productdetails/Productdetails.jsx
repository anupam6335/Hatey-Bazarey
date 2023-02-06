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
import { addItemToCart } from "../../actions/cartActions";

import "./Productdetails.css";
const Productdetails = ({ match }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const matchId = useParams();
  useEffect(() => {
    dispatch(getProductDetails(matchId.id));
    if (error) {
      toast.error(error);
    }
  }, [dispatch, error, toast, matchId]);

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product.stock) {
      toast.error(
        `our stock is ${product.stock}\n if you want more than this so please wait when our stock is incrase`
      );
      return;
    }

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) {
      toast.error(`you can't select 0\n please order more than 0 quantity`);
      return;
    }

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  const addToCart = () => {
    dispatch(addItemToCart(matchId.id, quantity));
    toast.success("Item Added to Cart");
  };

  return (
    <>
      <MetaData title={`${product.name}`} />
      {loading ? (
        <Loader />
      ) : (
        <div id="prodetails" className="section__p1">
          <div className="single__pro_image">
            {product.images &&
              product.images.map((image, idx) => (
                <img
                  key={idx}
                  className="d-block w-100"
                  src={image.url}
                  alt={product.title}
                  style={{ width: "100%" }}
                  id="MainImg"
                />
              ))}
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

            <div className="stockCounter d-inline">
              <span
                className="btn btn-danger minus"
                onClick={decreaseQty}
                style={{ fontSize: "30px" }}
              >
                -
              </span>

              <input
                type="number"
                className="form-control count d-inline"
                value={quantity}
                style={{ width: "56px", marginLeft: "10px" }}
                readOnly
              />

              <span
                className="btn btn-primary plus"
                onClick={increaseQty}
                style={{ marginRight: "10px", fontSize: "30px" }}
              >
                +
              </span>
            </div>

            <button
              className={product.stock === 0 ? "disableBtn" : "btn"}
              disabled={product.stock === 0}
              onClick={addToCart}
            >
              {product.stock === 0 ? "comming soon" : "Add To Cart"}
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
                  <label htmlFor="r-1"></label>

                  <input type="radio" name="rating" id="r-2" />
                  <label htmlFor="r-2"></label>

                  <input type="radio" name="rating" id="r-3" />
                  <label htmlFor="r-3"></label>

                  <input type="radio" name="rating" id="r-4" />
                  <label htmlFor="r-4"></label>

                  <input type="radio" name="rating" id="r-5" />
                  <label htmlFor="r-5"></label>
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
