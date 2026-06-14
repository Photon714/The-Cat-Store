import React from "react";
import "../css/Header.css";
import { useNavigate } from "react-router-dom";
function Header2() {
  const navigate = useNavigate();
  const handleCatClick = () => {
    navigate("/catGallery");
  };

  return (
    <header className="headerContainer">
      <div className="logoArea" onClick={handleCatClick}>
        <h2>😻 CatShop</h2>
      </div>
      <div className="searchArea">
        <input
          type="text"
          placeholder="Search for a breed..."
          className="searchInput"
        />
      </div>
      <div className="cartArea" onClick={handleCatClick}>
        <span className="cartIcon">🐾</span>
        <span className="cartText">Cats</span>
      </div>
    </header>
  );
}

export default Header2;
