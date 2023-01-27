import "./Featureproduct.css";
import { Product } from "../../allComponents";
import { Link } from "react-router-dom";
const Featureproduct = () => {
  return (
    <>
      <div id="feature" className="section__p1">
        <div className="fe__box">
          <img src="/assets/features/f1.png" alt="" />
          <h6>Free Shipping</h6>
        </div>

        <div className="fe__box">
          <img src="/assets/features/f2.png" alt="" />
          <h6>Online Order</h6>
        </div>

        <div className="fe__box">
          <img src="/assets/features/f3.png" alt="" />
          <h6>Save Money</h6>
        </div>

        <div className="fe__box">
          <img src="/assets/features/f4.png" alt="" />
          <h6>Promotions</h6>
        </div>

        <div className="fe__box">
          <img src="/assets/features/f5.png" alt="" />
          <h6>Happy Sell</h6>
        </div>

        <div className="fe__box">
          <img src="/assets/features/f6.png" alt="" />
          <h6>F24/7 Support</h6>
        </div>
      </div>

      <div id="product1" className="section__p1">
        <h2>Featured Products</h2>
        <p>Summer Collection New Modern Design</p>
        <Link to="/products" className="view__product">
          <div className="pro__container">
            <Product imgId="f1" imgName='Cartoon Astronaut T-Shirts' brandName='addidas' price='58'/>
            <Product imgId="f2" imgName='Cartoon Astronaut T-Shirts' brandName='zara' price='58'/>
            <Product imgId="f3" imgName='Cartoon Astronaut T-Shirts' brandName='fusion' price='58'/>
            <Product imgId="f4" imgName='Cartoon Astronaut T-Shirts' brandName='addidas' price='58'/>
            <Product imgId="f5" imgName='Cartoon Astronaut T-Shirts' brandName='zoya' price='58'/>
            <Product imgId="f6" imgName='Cartoon Astronaut T-Shirts' brandName='addidas' price='58'/>
            <Product imgId="f7" imgName='Cartoon Astronaut T-Shirts' brandName='addidas' price='58'/>
            <Product imgId="f8" imgName='Cartoon Astronaut T-Shirts' brandName='addidas' price='58'/>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Featureproduct;
