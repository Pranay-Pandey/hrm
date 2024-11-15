const express = require("express");
const app = require("express")();
require("dotenv").config();
const port = process.env.PORT || 4001;
const router = require("./router/index.js");
const cors = require("cors");
var bodyParser = require('body-parser')

/*app.use(express.json());*/
app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*", // Replace this with the actual frontend origin(s) you want to allow
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions)); // Set up CORS middleware

app.use("/api", router);

// health check
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
