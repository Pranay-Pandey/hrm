const mongoose = require("mongoose");
const { userSchema } = require("./schemas");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected!");
});

db.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});

const User = mongoose.model("User", userSchema);

module.exports = { db, User };
