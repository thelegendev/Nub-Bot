const { model, Schema } = require('mongoose');
 
let afkSchema = new Schema ({
    Guild: String,
    User: String,
    Message: String,
    Nickname: String
});
 
module.exports = model("afk", afkSchema);