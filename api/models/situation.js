var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SituationSchema = new Schema({
      situatielucrari: {
        situatie: String,
        data: String,
        beneficiar: String,
        produse: Array,
        totalCantitate: Number,
        totalPret: Number
    }
});

var Situation = mongoose.model("Situation", SituationSchema);

module.exports = Situation;