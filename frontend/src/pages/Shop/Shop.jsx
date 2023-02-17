import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProducts } from "../../actions/productActions";
import "./Shop.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Pagination from "react-js-pagination";
import { Loader, MetaData } from "../../components/allComponents";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Shop = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "MenClothes",
    "WomenClothes",
    "shoe",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const dispatch = useDispatch();
  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );
  const params = useParams();
  const keyword = params.keyword;
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, error, toast, keyword, currentPage, price, category, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;
  if (keyword) {
    let proLen = products.length;
    if (proLen <= 8) {
      count = 0;
    }
  }
  return (
    <>
      <MetaData title={"save money buy more"} />
      {loading ? (
        <Loader />
      ) : (
        <div className="section__p1">
          <div className="shop">
            {/* <div className="shop__category">
          <h4 style={{ fontWeight: "bold", marginBottom: "20px" }}>Category</h4>
          <ul className="pl-0">
            {categories.map((category) => (
              <li
                style={{
                  cursor: "pointer",
                  listStyleType: "none",
                }}
                key={category}
              >
                {category}
              </li>
            ))}
          </ul>
          <div>
            <h4 style={{ fontWeight: "bold" }}>Ratings</h4>

            <ul className="pl-0">
              {[5, 4, 3, 2, 1].map((star) => (
                <li
                  style={{
                    cursor: "pointer",
                    listStyleType: "none",
                  }}
                  key={star}
                >
                  <div className="rating-outer">
                    <div
                      className="rating-inner"
                      style={{
                        width: `${star * 20}%`,
                      }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
            <div className="shop__products">
              <div className="shop__single product" id="shop__product_1">
                <div className="shop__pro_container">
                  {products &&
                    products.map((product) => (
                      <div className="shop__pro">
                        <Link
                          to={`/product/${product._id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <img src={product.images[0].url} alt="" />
                          <div className="shop__des">
                            <span>{product.seller}</span>
                            <h5>{product.name}</h5>
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
                            <h4>${product.price}</h4>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>

              {resPerPage <= count && (
                <div className="d-flex justify-content-center mt-5">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText={"Next"}
                    prevPageText={"Prev"}
                    firstPageText={"First"}
                    lastPageText={"Last"}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
