import { Link } from "react-router-dom";
import "./Featureproduct.css";

const Product = ({imgId, imgName, price, brandName}) => {
  return (
    <>
          <div className="pro">
            <img src={`/assets/products/${imgId}.jpg`}alt="" />
            <div className="des">
              <span>{brandName}</span>
              <h5>{imgName}</h5>
              <div className="star">
                <i>⭐⭐⭐⭐⭐ (1 review)</i>
              </div>
              <h4>${price}</h4>
            </div>
            <Link to="/products" className="view__product cart">
              View Details
            </Link>
          </div>
    </>
  );
};

export default Product;
