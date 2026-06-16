import axios from "axios";

export const getCart = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://the-cat-store-backend.onrender.com/api/cart",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log("cart fetched");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error.response.data.message);
    } else {
      console.log("somethings wrong the backend");
    }
    return null;
  }
};

export const updateCartQuantity = async (accessToken, itemId, quantity) => {
  try {
    const body = {
      catId: itemId,
      quantity: quantity,
    };
    const response = await axios.put(
      "https://the-cat-store-backend.onrender.com/api/cart/change",
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log("quantity changed in backend");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error.response.data.message);
    } else {
      console.log("somethings wrong the backend");
    }
    return null;
  }
};

export const deleteTheCat = async (accessToken, itemId) => {
  try {
    const response = await axios.delete(
      "https://the-cat-store-backend.onrender.com/api/cart/remove",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          catId: itemId,
        },
      },
    );
    console.log("cat removed from backend");
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error.response.data.message);
    } else {
      console.log("somethings wrong the backend");
    }
    return null;
  }
};

export const VanishCart = async (accessToken) => {
  const response = await axios.delete(
    "https://the-cat-store-backend.onrender.com/api/cart/vanish",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
};
