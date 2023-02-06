import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
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
                Our Shop
              </Link>
            </li>

            <li class="menu__item">
              <a
                class="menu__link"
                href="https://github.com/anupam6335"
                target='_blank'
                style={{ textDecoration: "none" }}
              >
                Github
              </a>
            </li>
          </ul>
          <p style={{ opacity: "0.75" }}>Made with 🤍 by Anupam Debnath</p>
          <p>This is a project not a real website</p>
        </footer>
    </>
  );
};

export default Footer;
