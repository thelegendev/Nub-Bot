const mongoose = require("mongoose");
 
const verifySchema = new mongoose.Schema({
    Guild: String,
    Channel: String,
    Role: String,
    Message: String,
    Verified: Array
})
 
module.exports = mongoose.model("verifySystem", verifySchema);