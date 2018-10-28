var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var InvoiceSchema = new Schema({
    factura: {
        factura: String,
        firma: String,
        data: String,
        nrRegCom: String,
        cif: String,
        sediul: String,
        contBancar: String,
        banca: String,
        sucursala: String,
        produse: Array,
        totalFactura: Number,
        totalFacturaTva: Number,
        totalFacturaPlusTva: Number
      }
});

var Invoice = mongoose.model("Invoice", InvoiceSchema);

module.exports = Invoice;