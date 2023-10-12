const mongoose = require('mongoose');
 
const logSchema = new mongoose.Schema({
    Guild: String,
    Channel: String,
    Webhook: String
});
 
module.exports = mongoose.model("logSystem", logSchema);