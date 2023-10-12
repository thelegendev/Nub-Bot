const mongoose = require('mongoose');
 
const reminderSchema = new mongoose.Schema({
    User: String,
    Time: String,
    Remind: String,
    ID: String
})
 
module.exports = mongoose.model("reminderSystem", reminderSchema);