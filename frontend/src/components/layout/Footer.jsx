import "./Footer.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "../allComponents";
const Footer = () => {
  const { loading } = useSelector((state) => state.products);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <footer class="footer">
          <div class="waves">
            <div class="wave" id="wave1"></div>
            <div class="wave" id="wave2"></div>
            <div class="wave" id="wave3"></div>
            <div class="wave" id="wave4"></div>
          </div>

          <ul class="menu">
            <li class="menu__item">
              <Link
                class="menu__link"
                to="/"
                style={{ textDecoration: "none" }}
              >
                Home
              </Link>
            </li>
            <li class="menu__item">
              <Link
                class="menu__link"
                to="/shop"
                style={{ textDecoration: "none" }}
              >
                shop
              </Link>
            </li>
          </ul>
          <p style={{ opacity: "0.75" }}>Made with 🤍 by Anupam Debnath</p>
          <p>This is a project not a real website</p>
        </footer>
      )}
    </>
  );
};

export default Footer;
