const { model, Schema } = require("mongoose");

let levelSchema = new Schema({
    Guild: String,
    User: String,
    XP: Number,
    Level: Number
});

module.exports = model("level", levelSchema);