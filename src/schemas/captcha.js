const mongoose = require("mongoose");
 
const captchaSchema = new mongoose.Schema({
    Guild: String,
    Key: String,
    User: String
})
 
module.exports = mongoose.model("captchaSystem", captchaSchema);