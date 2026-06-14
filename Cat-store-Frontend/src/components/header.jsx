import React from "react";
import "../css/Header.css";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const handleCartClick = () => {
    navigate("/CartPage");
  };

  return (
    <header className="headerContainer">
      <div className="logoArea">
        <h2>😻 CatShop</h2>
      </div>
      <div className="searchArea">
        <input
          type="text"
          placeholder="Search for a breed..."
          className="searchInput"
        />
      </div>
      <div className="cartArea" onClick={handleCartClick}>
        <span className="cartIcon">🛒</span>
        <span className="cartText">Cart</span>
      </div>
    </header>
  );
}

export default Header;
