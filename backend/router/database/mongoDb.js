const { mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
  aadhar: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  privateKey: { type: String, required: true },
});

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
mongoose.connection.once("open", () => {
  console.log("MongoDB connected!");
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
