const { model, Schema} = require("mongoose");
 
let reminderSchema = new Schema({
    User: String,
    Time: String,
    Remind: String,
    ID: String
})
 
module.exports = model("reminder", reminderSchema);