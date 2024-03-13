const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017";

const conectToMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to mongo db...........");
  } catch (error) {
    console.log("Failed conection to mongo db", error);
  }
};

module.exports = conectToMongoDB;
