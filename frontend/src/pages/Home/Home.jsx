import { BiShoppingBag } from "react-icons/bi";
import "./Home.css";
const Home = () => {
  return (
    <>
      <section className="image__grid">
        <div className="image__grid_col__2 image__grid_row__2 box">
          <h3>
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
          <p>
          </p>
          <img
            src="https://res.cloudinary.com/hateybazarey/image/upload/v1674747888/products/watch_ujcdpg.webp"
            alt=" main banner"
          />
        </div>
      </section>
    </>
  );
};

export default Home;
