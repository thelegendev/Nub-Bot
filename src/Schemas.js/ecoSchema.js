const { model, Schema } = require("mongoose");
 
let ecoSchema = new Schema({
    Guild: String,
    User: String,
    Bank: Number,
    Wallet: Number,
    Worked: Number,
    Gambled: Number,
    Begged: Number,
    HoursWokred: Number,
    CommandsRan: Number,
    Moderated: Number
});
 
module.exports = model("economy", ecoSchema);