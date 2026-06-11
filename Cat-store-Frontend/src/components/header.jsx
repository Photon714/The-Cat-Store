import React from "react";
import "../css/Header.css";

function Header() {
  const handleCartClick = () => {
    console.log("Take me to the cart panel!");
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
