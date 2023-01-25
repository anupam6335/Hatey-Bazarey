import "./Navbar.css";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="logo">
        <Link to="/" className="logo__div">
          <img
            className="logo__img"
            src="/assets/HB-black.png"
            alt="Hatey Bazarey"
            draggable="false"
          />
        </Link>
      </div>
      <div className="menu__category menu">
        <ul className="menu__item">
          <li>
            <Link to="/login">
              <div className="menu__item_single__link">
                Mens
                <i className='bx bx-male'></i>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <div className="menu__item_single__link">
                Womens
                <i className='bx bx-female' ></i>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <div className="menu__item_single__link">
              accessories
              <i className='bx bxs-devices'></i>
              </div>
            </Link>
          </li>
        </ul>
        <div className="user__profile">{/* user image */}</div>
      </div>
      <div className="serach__bar">
        <form className="search-box">
          <input type="text" placeholder="Search your fav products" />
          <button type="reset"></button>
        </form>
      </div>
      <div className="menu">
        <ul className="menu__item">
          <li>
            <Link to="/login">
              <div className="menu__item_single__link">
                Login
                <i className='bx bx-log-in-circle' ></i>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <div className="menu__item_single__link">
                Cart
                <i className='bx bx-shopping-bag' ></i>
              </div>
            </Link>
          </li>
        </ul>
        <div className="user__profile">{/* user image */}</div>
      </div>
    </nav>
  );
};

export default Navbar;
