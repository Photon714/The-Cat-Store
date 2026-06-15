import React from "react";
import "../css/Header.css";
import { useNavigate } from "react-router-dom";
function Header({ searchCat, setSearchCat, hideSearch, isCartPage }) {
  const navigate = useNavigate();
  const handleCatClick = () => {
    navigate("/catGallery");
  };
  const handleRightClick = () => {
    if (isCartPage) {
      navigate("/catGallery");
    } else {
      navigate("/CartPage");
    }
  };
  return (
    <header className="headerContainer">
      <div className="logoArea" onClick={handleCatClick}>
        <img src="/9062406.jpg" alt="Cat Store Logo" className="brandLogo" />
        <h2 className="brandText">The Cat Store</h2>
      </div>
      <div className="searchArea">
        {!hideSearch && (
          <input
            type="text"
            placeholder="Search for a breed..."
            className="searchInput"
            value={searchCat || ""}
            onChange={(e) => {
              if (setSearchCat) {
                setSearchCat(e.target.value);
              }
            }}
          />
        )}
      </div>
      <div className="cartArea" onClick={handleRightClick}>
        <span className="cartIcon">{isCartPage ? "🐾" : "🛒"}</span>
        <span className="cartText">{isCartPage ? "Cats" : "Cart"}</span>
      </div>
    </header>
  );
}

export default Header;
