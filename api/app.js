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
      client: "client 1",
      data: "18-08-2018"
    },
    {
      title: "factura-02",
      client: "client 2",
      data: "19-08-2018"
    },
    {
      title: "factura-03",
      client: "client 3",
      data: "20-08-2018"
    },
    {
      title: "factura-04",
      client: "client 4",
      data: "22-08-2018"
    }
  ]);
});
app.listen(process.env.PORT || 8081);
