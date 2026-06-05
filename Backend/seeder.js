/* 
Used to send our data ie cats to backend such that backend se cats fetch honge and if we add new cat same will happen in backend
each page refresh pe pura cats load hoga ig
*/
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Cat = require("./models/catModel.js");
const data = require("./Data/data.js");

const importToMongoose = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    // connecting to mongodb

    await Cat.deleteMany();
    // deleting previous old version data

    await Cat.insertMany(data);
    //inserting new cats:>
    process.exit();
  } catch (error) {
    console.error("Failed to import data:", error);
    process.exit(1);
  }
};
importToMongoose();
