const mongoose = require('mongoose');
 
const pollSchema = new mongoose.Schema({
    Guild: String,
    Msg: String,
    UpMembers: Array,
    DownMembers: Array,
    Upvote: Number,
    Downvote: Number,
    Owner: String
});
 
module.exports = mongoose.model("pollSystem", pollSchema);