const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./Middleware/errorHandler.js");
const connectDb = require("./config/dbConnection.js");

connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/UI", require("./Route/route.js")); //middleware ie ye url pe call aaya to ye behjo
app.use("/api/user", require("./Route/user.js")); //this is for authentication of users
app.use(errorHandler);
app.listen(port, () => {
  console.log("Listening on port 5001");
});
