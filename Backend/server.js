const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./Middleware/errorHandler.js");
const connectDb = require("./config/dbConnection.js");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "https://the-cat-store-backend.onrender.com",
  }),
);
connectDb();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/cat", require("./Route/cat-route.js")); //middleware ie ye url pe call aaya to ye behjo
app.use("/api/cart", require("./Route/cart-route.js")); //middleware ie ye url pe call aaya to ye behjo
app.use("/api/user", require("./Route/user.js")); //this is for authentication of users
app.use(errorHandler);
app.listen(port, () => {
  console.log("Listening on port 5001");
});
