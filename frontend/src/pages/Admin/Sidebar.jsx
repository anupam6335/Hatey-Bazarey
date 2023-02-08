import React from "react";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import "./Alladmin.css";
import { FaProductHunt, FaUsers } from "react-icons/fa";
import { RiShoppingBasketLine } from "react-icons/ri";
import { BsStarHalf } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <nav id="sidebar">
        <ul className="list-unstyled components">
          <li className="single__link_admin">
            <Link
              to="/dashboard"
              style={{ textDecoration: "none", color: "#000", padding: '20px', marginBottom: '30px' }}
            >
              <GoHome /> Dashboard
            </Link>
          </li>

          <li className="single__link_admin" style={{ flexDirection: 'column'}}>
            <a
             style={{ textDecoration: "none", color: "#000", padding: '20px', marginBottom: '30px' }}
              href="#productSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <FaProductHunt /> Products
            </a>
            <ul className="collapse list-unstyled" id="productSubmenu">
              <li className="single__link_admin collapse__admin">
                <Link
                  to="/admin/products"
                 style={{ textDecoration: "none", color: "#000", padding: '20px', marginBottom: '30px' }}
                >
                  <i className="fa fa-clipboard"></i> All
                </Link>
              </li>

              <li className="single__link_admin collapse__admin">
                <Link
                  to="/admin/product"
                 style={{ textDecoration: "none", color: "#000", padding: '20px', marginBottom: '30px' }}
                >
                  <i className="fa fa-plus"></i> Create
                </Link>
              </li>
            </ul>
          </li>

          <li className="single__link_admin">
            <Link
              to="/admin/orders"
             style={{ textDecoration: "none", color: "#000", padding: '20px', marginBottom: '30px' }}
            >
              <RiShoppingBasketLine /> Orders
            </Link>
          </li>

          <li className="single__link_admin">
            <Link
              to="/admin/users"
             style={{ textDecoration: "none", color: "#000", padding: '20px', marginBottom: '30px' }}
            >
              <FaUsers /> Users
            </Link>
          </li>

          <li className="single__link_admin">
            <Link
              to="/admin/reviews"
             style={{ textDecoration: "none", color: "#000", padding: '20px', marginBottom: '30px' }}
            >
              <BsStarHalf /> Reviews
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
