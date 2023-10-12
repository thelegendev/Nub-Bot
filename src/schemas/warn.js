const mongoose = require('mongoose');

const warnSchema = new mongoose.Schema({
    GuildID: String,
    UserID: String,
    UserTag: String,
    Content: Array
});

module.exports = mongoose.model("warnSystem", warnSchema);