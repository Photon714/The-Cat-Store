import { fetchCats } from "../Services/cats.js";
import React, { useState, useEffect } from "react";
import Card from "./Card.jsx";
import "../css/catGallery.css";
import Header from "./header.jsx";

function ShowAllCats() {
  const [cats, setCats] = useState([]);

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

  return (
    <>
      <Header />
      <div className="cardContainer">
        {cats.map((data) => (
          <Card
            key={data._id}
            name={data.name}
            age={data.age}
            breed={data.breed}
            cost={data.price}
            description={data.description}
          />
        ))}
      </div>
    </>
  );
}
export default ShowAllCats;
