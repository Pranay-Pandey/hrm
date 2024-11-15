const { db } = require("./mongoDb");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  aadhar: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  privateKey: { type: String, required: true },
});

module.exports = { userSchema };
