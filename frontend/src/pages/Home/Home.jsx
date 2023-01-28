import { BiShoppingBag } from "react-icons/bi";
import "./Home.css";
import "./Featureproduct.css";
import { Loader, MetaData, Product } from "../../components/allComponents";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );
  
  useEffect(() => {
    if(error) {
      return toast.error(error)
    }
    dispatch(getProducts());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title={`Buy best products online`} />
      {loading ? <Loader/> : (<> <section className="image__grid">
        <div className="image__grid_col__2 image__grid_row__2 box">
          <h3 className="bose__text">
            Bose QuietComfort <p>45</p>{" "}
          </h3>
          <p>
            SOUNDS <br /> LIKE AN <br /> EPIPHANY.{" "}
          </p>
          <img
            src="https://res.cloudinary.com/hateybazarey/image/upload/v1674741172/products/headphone_with_girl_geyvtd.webp"
            alt=" main banner"
          />
          <BiShoppingBag className="cardIcon" />
        </div>
        <div className="boxs">
          {/* <h3>Girls Hoodies</h3> */}
          <img
            src="https://res.cloudinary.com/hateybazarey/image/upload/v1674744963/products/hoodie_girl_kxhlav.jpg"
            alt=" main banner"
          />
        </div>
        <div className="boxs">
          {/* <h3 className="boys">Boys <br /> sweater</h3> */}
          <img
            src="https://res.cloudinary.com/hateybazarey/image/upload/v1674746307/products/boys_sweater_tv23fl.jpg"
            alt=" main banner"
          />
        </div>

        <div className="boxs">
          <img
            src="https://res.cloudinary.com/hateybazarey/image/upload/v1674746870/products/phone_nehycw.jpg"
            alt=" main banner"
          />
        </div>
        <div className="boxs">
          {/* <h3 className="phone">HB watchs</h3> */}
          <p></p>
          <img
            src="https://res.cloudinary.com/hateybazarey/image/upload/v1674747888/products/watch_ujcdpg.webp"
            alt=" main banner"
          />
        </div>
      </section>
      {/* <Featureproduct/> */}
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
        <div to="/products" className="view__product">
          <div className="pro__container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product}/>
              ))}
          </div>
        </div>
        ;
      </div></>)}
     
    </>
  );
};

export default Home;
