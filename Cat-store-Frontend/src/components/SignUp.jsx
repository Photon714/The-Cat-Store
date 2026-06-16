import React, { useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
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
        "https://the-cat-store-backend.onrender.com/api/user/register",
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
    <div className="loginContainer">
      <div className="loginBox">
        <h2>Welcome :D</h2>
        <p>Create An account to meet the cats :3</p>
        {errorMessage && (
          <div
            style={{ color: "red", fontWeight: "bold", marginBottom: "15px" }}
          >
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSignUp} className="loginForm">
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
          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
        <p className="toggleText">
          Already have an account ?
          <Link to="/Login" className="toggleLink">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
export default SignUp;
