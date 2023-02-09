import { useState, useEffect } from "react";

import { ListReviews, Loader, Product } from "../allComponents";
import { getProducts } from "../../actions/productActions";

import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  newReview,
  clearErrors,
} from "../../actions/productActions";
import { MetaData } from "../allComponents";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { addItemToCart } from "../../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

import "./Productdetails.css";
const Productdetails = ({ match }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const matchId = useParams();

  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    dispatch(getProductDetails(matchId.id));
    dispatch(getProducts());
    if (error) {
      toast.error(error);
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Reivew posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, error, toast, reviewError, matchId, success]);

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

  function setUserRatings() {
    const stars = document.querySelectorAll(".mystar");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", matchId.id);

    dispatch(newReview(formData));
  };

  const addToCart = () => {
    dispatch(addItemToCart(matchId.id, quantity));
    toast.success("Item Added to Cart");
  };

  const currentProductCatergory = product.category;

  return (
    <>
      <MetaData title={`${product.name}`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div id="prodetails" className="section__p1">
            <div className="single__pro_image">
              {product.images &&
                product.images.map((image, idx) => (
                  <img
                    key={idx}
                    className="d-block"
                    src={image.url}
                    alt={product.title}
                    style={{ width: "100%" }}
                    id="MainImg"
                  />
                ))}
            </div>

            <div className="single__pro_details">
              <h6>{product.seller} / {product.category}</h6>
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
                  className="btns btn-danger minus"
                  onClick={decreaseQty}
                  style={{ fontSize: "30px" }}
                >
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={product.stock === 0 ? 0 : quantity}
                  style={{ width: "56px", marginLeft: "10px" }}
                  readOnly
                />

                <span
                  className="btns btn-success plus"
                  onClick={increaseQty}
                  style={{ marginRight: "10px", fontSize: "30px" }}
                >
                  +
                </span>
              </div>

              <button
                className={product.stock === 0 ? "disableBtn" : "btns"}
                disabled={product.stock === 0}
                onClick={addToCart}
              >
                {product.stock === 0 ? "comming soon" : "Add To Cart"}
              </button>
              <h4>Product Details</h4>
              <span>{product.description}</span>
              <p style={{ marginTop: "20px" }}>
                Status:{" "}
                <strong
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}{" "}
                </strong>
              </p>

              {product.stock <= 0 ? (
                <div className="alert alert-danger mt-5" type="alert">
                  currently out of stock you cant post review
                </div>
              ) : (
                <>
                  {user ? (
                    <button
                      id="review_btn"
                      type="button"
                      className="btns"
                      data-toggle="modal"
                      data-target="#ratingModal"
                      onClick={setUserRatings}
                    >
                      Submit Your Review
                    </button>
                  ) : (
                    <div
                      className="alert alert-danger mt-5"
                      type="alert"
                      style={{ width: "250px" }}
                    >
                      <Link
                        to="/login"
                        style={{
                          fontWeight: "bold",
                          textDecoration: "none",
                          color: "#000",
                        }}
                      >
                        Login to post your review.
                      </Link>
                    </div>
                  )}
                </>
              )}

              <div className="row mt-2 mb-5">
                <div className="myrating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <ul className="stars">
                            <li className="mystar">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="mystar">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="mystar">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="mystar">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="mystar">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>

                          <button
                            className="btn my-3 float-right review-btn px-4 text-white"
                            onClick={reviewHandler}
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="combined__box_review_recoProduct">
            <div className="reviewBox">
              {" "}
              {product.reviews && product.reviews.length > 0 && (
                <ListReviews reviews={product.reviews} />
              )}
            </div>

            <div className="whole_reco_box">
            <h3>Similar products</h3>
              <div className="recomended_products">
                {products.map((product) => (
                  <>
                    {product.category === currentProductCatergory &&
                      matchId.id !== product._id && (
                        <div className="shop__pro_recom" style={{marginTop: '15px'}}>
                          <Link
                            to={`/product/${product._id}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <img src={product.images[0].url} alt="" />
                            <div className="shop__des_reco">
                              <h5 style={{fontSize:'15px'}}>{product.name}</h5>
                              <div className="star ratings">
                                <div className="rating-outer">
                                  <div
                                    className="rating-inner"
                                    style={{
                                      width: `${(product.ratings / 5) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                                <span id="no_of_reviews">
                                  ({product.numOfReviews} review)
                                </span>
                              </div>
                              <h4 style={{fontSize: '20px'}}>${product.price}</h4>
                            </div>
                          </Link>
                        </div>
                      )}
                  </>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Productdetails;
