const mongoose = require('mongoose');
 
const afkSchema = new mongoose.Schema({
    Guild: String,
    User: String,
    Message: String,
    Nickname: String
});
 
module.exports = mongoose.model("afkSystem", afkSchema);