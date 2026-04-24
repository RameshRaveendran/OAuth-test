const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connection done");
  } catch (error) {
    console.log(error);
    process.exit(1); // to stop application
  }
};

module.exports = connectDB;
