"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment");
require('dotenv').config();
var mongoose = require('mongoose');
const Invoice = require("./models/invoice");

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds143593.mlab.com:43593/flomediastar', { useNewUrlParser: true });
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

var data = [];
var sitLucrari = [];

for (let index = 1; index < 40; index++) {
  data.push(
    {
      factura: {
        factura: 'factura-' + index,
        firma: 'client ' + index,
        data: new Date(),
        nrRegCom: '1',
        cif: '1',
        sediul: '1',
        contBancar: '1',
        banca: '1',
        sucursala: '1',
        produse: [{
            descriere: 'Prestari servicii',
            unitate: '',
            pret: 0,
            cantitatea: 0,
            valoarea: 0
        }],
        totalFactura: 0,
        totalFacturaTva: 0,
        totalFacturaPlusTva: 0
      }
    }
  );
};
for (let index = 1; index < 40; index++) {
  sitLucrari.push(
    {
      situatielucrari: {
        situatie: 'Situatie lucrari nr. ' + index + '/' + moment(new Date()).format('D-M-YYYY'),
        data: moment(new Date()).format('D-M-YYYY'),
        beneficiar: 'Beneficiar ' + index,
        produse: [{
            nrcrt: 0,
            denumire: '',
            um: '',
            cantitatea: 0,
            pret: 0
        }],
        totalCantitate: 0,
        totalPret: 0
      }
    }
  );
};

app.get("/invoice", (req, res) => {
  res.send(data);
});
app.post("/invoice", (req, res) => {

  var factura = req.body.factura,
      nume = factura.factura,
      firma = factura.firma,
      data = factura.data,
      nrRegCom = factura.nrRegCom,
      cif = factura.cif,
      sediul = factura.sediul,
      contBancar = factura.contBancar,
      banca = factura.banca,
      sucursala = factura.sucursala,
      produse = factura.produse,
      total = factura.totalFactura,
      totalTva = factura.totalFacturaTva,
      totalPlusTv = factura.totalFacturaPlusTva;

  var new_invoice = new Invoice({
    factura: {
      factura: nume,
      firma: firma,
      data: data,
      nrRegCom: nrRegCom,
      cif: cif,
      sediul: sediul,
      contBancar: contBancar,
      banca: banca,
      sucursala: sucursala,
      produse: produse,
      totalFactura: total,
      totalFacturaTva: totalTva,
      totalFacturaPlusTva: totalPlusTv
    }
  });
  new_invoice.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Invoice saved successfuly!'
    })
  })

});
app.get("/situatie-lucrari", (req, res) => {
  res.send(sitLucrari);
});
app.listen(process.env.PORT || 8081);
