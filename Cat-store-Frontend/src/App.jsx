import React from "react";
import ShowAllCats from "./components/catGallery.jsx";
import LogIn from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import ShowCart from "./components/CartPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/catGallery" element={<ShowAllCats />} />
        <Route path="/CartPage" element={<ShowCart />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
