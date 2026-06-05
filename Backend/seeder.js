const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Cat = require("./models/catModel.js");
const data = require("./Data/data.js");

const importToMongoose = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("connecting to mongodb");

    await Cat.deleteMany();
    console.log("deleting previous old version data");

    await Cat.insertMany(data);
    console.log("inserting new cats:>");
    process.exit();
  } catch (error) {
    console.error("Failed to import data:", error);
    process.exit(1);
  }
};
importToMongoose();
