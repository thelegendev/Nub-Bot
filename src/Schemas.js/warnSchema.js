const { model, Schema} = require('mongoose');

let warningSchema = new Schema({
    GuildID: String,
    UserID: String,
    UserTag: String,
    Content: Array
});

module.exports = model("warn", warningSchema);