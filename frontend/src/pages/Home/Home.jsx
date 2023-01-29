import {
  Banner,
  Loader,
  MetaData,
  Product,
} from "../../components/allComponents";
import { getProducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { BiShoppingBag } from "react-icons/bi";
import Pagination from "react-js-pagination";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "./Featureproduct.css";
import "./Home.css";
import { Link, useParams } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );
  const params = useParams();
  const keyword = params.keyword;
  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, error, keyword, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = productsCount;

  return (
    <>
      <MetaData title={`Buy best products online`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {currentPage === 1 && !keyword && <Banner />}

          <div id="product1" className="section__p1">
            <h2>{keyword ? `${keyword.toLocaleUpperCase()}`: 'Trending Products'}</h2>
            <p>
              {!keyword && currentPage === 3 && "Fresh Fruits"}
              {!keyword && currentPage === 1 && "Summer Collection New Modern Design"}
              {!keyword && currentPage === 2 && "Our Electronics Product"}
            </p>
            <div to="/products" className="view__product">
              <div className="pro__container">
                {products &&
                  products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
              </div>
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
        </>
      )}
    </>
  );
};

export default Home;
