const { model, Schema } = require('mongoose');
 
const ticketSchema = new Schema({
    GuildID: String,
    Category: String,
    Channel: String,
    Role: String,
    Logs: String,
 
})
 
module.exports = model("ticket", ticketSchema);