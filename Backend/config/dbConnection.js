const mongoose = require("mongoose");
/*
Using the connect constant to connect to the database using the connection string which was given by mongodb(web)
*/
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Database Connected successfully",
      connect.connection.host,
      connect.connection.name,
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDb;
