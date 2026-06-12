import React, { useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LogIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleLogIn = async (e) => {
    e.preventDefault();
    const dataFromUser = {
      username: userName,
      password: password,
    };
    let responseData = await getAccessToken(dataFromUser);
    if (responseData) {
      localStorage.setItem("accessToken", responseData.accessToken);
      navigate("/catGallery");
    }
  };
  async function getAccessToken(data) {
    try {
      setErrorMessage("");
      const response = await axios.post(
        "http://localhost:5001/api/user/login",
        data,
      );
      console.log(
        "Backend responded for user assigning and accessToken obtained",
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "invalid Input");
      } else {
        setErrorMessage("cannot connect to the server");
      }
      return null;
    }
  }
  return (
    <div className="logonContainer">
      <div className="loginBox">
        <h2>Welcome Back:D</h2>
        <p>Log In to meet the cats :3</p>
        {errorMessage && (
          <div
            style={{ color: "red", fontWeight: "bold", marginBottom: "15px" }}
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogIn} className="loginForm">
          <div className="inputField">
            <label>Username</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="inputField">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="sumbitButton">
            Submit
          </button>
        </form>
        <p className="toggleText">
          Don't have an account ?
          <Link to="/SignUp" className="toggleLink">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
export default LogIn;
