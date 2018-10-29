"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const moment = require("moment");
const path = require("path");
require('dotenv').config();
var mongoose = require('mongoose');
const Invoice = require("./models/invoice");
const Situation = require("./models/situation");

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

app.use(express.static('public'))

app.get("/invoice", (req, res) => {
  Invoice.find({}, 'factura', function (error, factura) {
    if (error) { console.error(error); }
    res.send(factura)
  }).sort({_id:-1})
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
app.put('/invoice', (req, res) => {
  var id = req.body._id;
  var factura = req.body.data;
  Invoice.findById(id, 'factura', function (error, invoice) {
    if (error) { console.error(error); }
    invoice.factura = factura
    invoice.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
});

app.delete("/invoice", (req, res) => {
  var id = req.query.id;
  
  Invoice.deleteOne({_id: id})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'deleted'
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  });
});

app.get("/situatie-lucrari", (req, res) => {
  Situation.find({}, 'situatielucrari', function (error, situation) {
    if (error) { console.error(error); }
    res.send(situation)
  }).sort({_id:-1})
});

app.post("/situatie-lucrari", (req, res) => {
  var situatie       = req.body.situatielucrari;

  var situatie       = req.body.situatielucrari.situatie,
      data           = req.body.situatielucrari.data,
      beneficiar     = req.body.situatielucrari.beneficiar,
      produse        = req.body.situatielucrari.produse,
      totalCantitate = req.body.situatielucrari.totalCantitate,
      totalPret      = req.body.situatielucrari.totalPret;

var new_situation = new Situation({
  situatielucrari: { 
    situatie: situatie,
       data: data,
       beneficiar: beneficiar,
       produse: produse,
       totalCantitate: totalCantitate,
       totalPret: totalPret 
      }
  });
  new_situation.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true,
      message: 'Situation saved successfuly!'
    })
  });
});

app.delete("/situatie-lucrari", (req, res) => {
  var id = req.query.id;
  
  Situation.deleteOne({_id: id})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'deleted'
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.listen(process.env.PORT || 8081);
