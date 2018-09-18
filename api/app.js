"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment");

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

var data = [];
var date = new Date();

for (let index = 0; index < 40; index++) {
  data.push(
    {
      title: "factura-" + index,
      client: "client " + index,
      data: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    }
  )
  
};
app.get("/invoice", (req, res) => {
  res.send(data);
});
app.listen(process.env.PORT || 8081);
