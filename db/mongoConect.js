const mongoose = require("mongoose");
const { DB_URI } = process.env;

async function dbConnect() {
  await mongoose.connect(DB_URI);
}

module.exports = dbConnect;
