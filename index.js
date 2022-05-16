const express = require("express");
const app = express();

const mongoose = require("mongoose");

require('dotenv').config();
// const debug = require("debug")('app:main');
const router = require("./src/routes")

// console.log(process.env.NODE_ENV)
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose
  .connect(process.env.dbAddress )
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("could not connect"));

app.use('/api', router);

const port = process.env.PORT || 3500;
app.listen(port, ()=> console.log(`listening on port ${port}`));

