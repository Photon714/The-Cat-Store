import { fetchCats } from "../Services/cats.js";
import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";
import "../css/catGallery.css";
import Header from "./header.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ShowAllCats() {
  const [cats, setCats] = useState([]);
  const [cartMessage, setCartMessage] = useState("");
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  useEffect(() => {
    const getCats = async () => {
      const fetchedCats = await fetchCats();
      if (fetchedCats.length <= 0) {
        console.log("Cats not loaded something wrong with the backend");
      } else {
        console.log(fetchedCats);
        console.log("cats successfully loaded in UI");
        setCats(fetchedCats);
      }
    };
    getCats();
  }, []);

  const handleQuantityChange = (catId, val) => {
    setQuantities({
      ...quantities,
      [catId]: val,
    });
  };

  const handleAddToCart = async (catId) => {
    const token = localStorage.getItem("accessToken");
    const quan = Number(quantities[catId]) || 1;
    if (!token) {
      alert("loggin to access cart and add items to it");
      navigate("/");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5001/api/cart/add",
        { catId: catId, quantity: quan },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("Cart updated:", response.data);
      setCartMessage("Added to cart successfully! 🐾");
      setTimeout(() => setCartMessage(""), 3000);
    } catch (error) {
      console.log("Cart Error:", error.response?.data || error.message);
      setCartMessage("Failed to add to cart.");
      setTimeout(() => setCartMessage(""), 3000);
    }
  };

  return (
    <>
      <Header />
      <div className="cardContainer">
        {cats.map((data) => (
          <div key={data._id} className="cardWrapper">
            <Card
              key={data._id}
              name={data.name}
              age={data.age}
              breed={data.breed}
              cost={data.price}
              description={data.description}
            />
            <div className="cardActionRow">
              <button
                className="galleryAddToCartBtn"
                onClick={() => handleAddToCart(data._id)}
              >
                Add to Cart
              </button>
              <input
                type="number"
                min="1"
                className="quantityInput"
                value={quantities[data._id] ?? 1} // Value comes from our state object
                onChange={(e) => handleQuantityChange(data._id, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default ShowAllCats;
