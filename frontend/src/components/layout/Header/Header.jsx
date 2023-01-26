import "./Header.css";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai"
import { Card, User } from "../../allComponents";



const Header = () => {
  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header");
    header.classList.toggle("active", this.window.scrollY > 100);
  });
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  return      <header className='header'>
  <div className='scontainer flex'>
    <div className='logo'>
      <Link to='/'>
        <img src='/assets/HB-black.png' alt='Hatey bazarey' style={{height: '70px', width: '140px'}}/>
      </Link>
    </div>
    <div className='search flex'>
      <AiOutlineSearch className='searchIcon' />
      <input type='text' placeholder='Search...' />
    </div>
    <div className='account flexCenter'>
      <Card/>
      <User/>
    </div>
  </div>
</header>
};

export default Header;
