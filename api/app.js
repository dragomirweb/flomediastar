"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.get("/invoice", (req, res) => {
  res.send([
    {
      title: "factura-01",
      data: "18-08-2018"
    },
    {
      title: "factura-02",
      data: "19-08-2018"
    },
    {
      title: "factura-03",
      data: "20-08-2018"
    }
  ]);
});
app.listen(process.env.PORT || 8081);
