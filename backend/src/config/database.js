const mongoose = require("mongoose");
const ConnectDb = async () => {
    await mongoose.connect("mongodb://localhost:27017/Voting");
    console.log("connected to database successfully");
}

module.exports = ConnectDb;