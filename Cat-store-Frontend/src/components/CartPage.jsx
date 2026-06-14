import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header2 from "./Header2.jsx";
import "../css/cartCss.css";
import { getCart } from "../Services/cart.js";
import { updateCartQuantity } from "../Services/cart.js";
import { deleteTheCat } from "../Services/cart.js";

/*This should be executed when clicked on cart icon */

function ShowCart() {
  const [cartBillis, setCartBillis] = useState([]);
  const [cartMessage, setCartMessage] = useState("");
  const [quantities, setQuantities] = useState({});
  const [customName, setCustomName] = useState(() => {
    const savedNames = localStorage.getItem("cartCatNames");
    return savedNames ? JSON.parse(savedNames) : {};
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please Log in first to access the cart");
      navigate("/");
      return;
    }

    const fetchBilli = async () => {
      try {
        const fetchedBillis = await getCart(token);
        console.log("billis obtained :]");
        console.log(fetchedBillis);
        setCartBillis(fetchedBillis?.items || []);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        setCartMessage("We encountered an error loading your cart.");
      }
    };

    fetchBilli();
  }, [navigate]);

  const handleQuantityChange = async (itemId, value) => {
    if (value === "") {
      setQuantities((prev) => ({
        ...prev,
        [itemId]: "",
      }));
      return;
    }

    const newQuantity = Number(value);

    if (newQuantity < 1) return;

    setQuantities((prev) => ({
      ...prev,
      [itemId]: newQuantity,
    }));
    const token = localStorage.getItem("accessToken");
    try {
      await updateCartQuantity(token, itemId, newQuantity);

      // 2. YOUR IDEA: Fetch the freshly updated AND populated cart!
      const freshCart = await getCart(token);
      setCartBillis(freshCart?.items || []);

      // 3. Clear the local typing state so the database data takes over
      setQuantities((prev) => {
        const newQuantities = { ...prev };
        delete newQuantities[itemId];
        return newQuantities;
      });
    } catch (error) {
      console.error(
        "Backend Error Message:",
        error.response?.data?.message || error.message,
      );

      // Revert if it fails
      const fetchBilli = async () => {
        const fetchedBillis = await getCart(token);
        setCartBillis(fetchedBillis?.items || []);
        setQuantities({});
      };
      fetchBilli();
    }
  };

  const totalItems = cartBillis.reduce((sum, item) => {
    const cat = item.catId || item.product;
    if (!cat) return sum;
    // Safely force the ID to be a string
    const actualCatId = (cat._id || cat.id || cat).toString();
    const qty = quantities[actualCatId] || item.quantity || 1;
    return sum + qty;
  }, 0);

  const cartSubtotal = cartBillis
    .reduce((sum, item) => {
      const cat = item.catId || item.product;
      if (!cat) return sum;
      // Safely force the ID to be a string
      const actualCatId = (cat._id || cat.id || cat).toString();
      const price = cat.price || 0;
      const qty = quantities[actualCatId] || item.quantity || 1;
      return sum + price * qty;
    }, 0)
    .toFixed(2);

  const deleteCat = async (catId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await deleteTheCat(token, catId);
      const freshCart = await getCart(token);
      setCartBillis(freshCart?.items || []);
    } catch (error) {
      console.log(error);
      const fetchBilli = async () => {
        const fetchedBillis = await getCart(token);
        setCartBillis(fetchedBillis?.items || []);
        setQuantities({});
      };
      fetchBilli();
    }
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      localStorage.setItem("cartCatNames", JSON.stringify(customName));
      e.target.blur();
    }
  };
  const handleCustomName = (catId, newName) => {
    setCustomName((prevName) => ({
      ...prevName,
      [catId]: newName,
    }));
  };

  return (
    <div className="cart-page">
      <Header2 />
      <div className="cart-content">
        <h1>Your Cart</h1>

        {cartMessage && <p className="cart-message">{cartMessage}</p>}

        {cartBillis.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartBillis.map((item, index) => {
                const cat = item.catId || item.product;

                if (!cat) return null;

                const actualCatId = (cat._id || cat.id || cat).toString();
                const quantity =
                  quantities[actualCatId] !== undefined
                    ? quantities[actualCatId]
                    : item.quantity || 1;

                return (
                  <div key={actualCatId} className="cart-item">
                    <div className="item-image-container">
                      <img
                        src={cat.image || "../assests.image.png"}
                        alt={cat.name || "Cart item"}
                        className="item-image"
                      />
                    </div>

                    <div className="item-details">
                      <h3 className="item-title">
                        {cat.name || cat.title || "Unnamed item"}
                      </h3>
                      <p className="item-specs">
                        <strong>Breed</strong>: {cat.breed || "Unknown"}
                      </p>
                      <p className="item-stock">In Stock</p>

                      <div
                        className="item-fun-addon"
                        style={{ fontSize: "13px", marginBottom: "15px" }}
                      >
                        <label
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <span style={{ marginRight: "8px" }}>
                            🐱 Custom Name Tag:
                          </span>
                          <input
                            type="text"
                            placeholder="e.g. Mr. Whiskers"
                            value={customName[actualCatId] || ""}
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              padding: "4px 8px",
                              fontSize: "12px",
                              outline: "none",
                            }}
                            onKeyDown={handleKeydown}
                            onChange={(e) =>
                              handleCustomName(actualCatId, e.target.value)
                            }
                          />
                        </label>
                      </div>

                      <div className="item-actions">
                        <div className="qty-select-container">
                          Qty:
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            className="qty-input"
                            onChange={(e) =>
                              handleQuantityChange(actualCatId, e.target.value)
                            }
                          />
                        </div>

                        <span className="action-separator">|</span>
                        <button
                          className="action-button"
                          onClick={() => deleteCat(actualCatId)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="item-price-container">
                      <p className="item-price">
                        ${Number(cat.price || 0).toFixed(2)}
                      </p>
                      <button className="order-meow-btn item-order-btn">
                        Order da meow
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-subtotal">
              Subtotal ({totalItems} items): <strong>${cartSubtotal}</strong>
            </div>
            <div className="cart-checkout-container">
              <button className="order-meow-btn main-order-btn">
                Order da meow
              </button>
            </div>
            <div className="cart-disclaimer">
              The price and availability of items at MyCatStore are subject to
              change. The Cart is a temporary place to store a list of your
              items and reflects each item's most recent price.{" "}
              <span className="link-text">Learn more</span>
              <br />
              Do you have a gift card or promotional code? We'll ask you to
              enter your claim code when it's time to pay.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default ShowCart;
