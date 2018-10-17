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
var sitLucrari = [];

for (let index = 0; index < 40; index++) {
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
for (let index = 0; index < 40; index++) {
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
app.get("/situatie-lucrari", (req, res) => {
  res.send(sitLucrari);
});
app.listen(process.env.PORT || 8081);
