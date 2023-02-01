import "./Header.css";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { Card, User, Loader, Search } from "../../allComponents";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header");
    header.classList.toggle("active", this.window.scrollY > 100);
  });
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <>
      {" "}
      {loading ? (
        <Loader />
      ) : (
        <header className="header">
          <div className="scontainer flex">
            <div className="logo">
              <Link to="/">
                <img
                  src="/assets/HB-black.png"
                  alt="Hatey bazarey"
                  style={{ height: "70px", width: "140px" }}
                />
              </Link>
            </div>
            <Search />
            <div className="account flexCenter">
              <Link to="/cart">
                <Card />
              </Link>
              <User />
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
