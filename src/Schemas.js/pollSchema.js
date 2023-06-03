const {model, Schema} = require('mongoose');
 
let vote = new Schema({
    Guild: String,
    Msg: String,
    UpMembers: Array,
    DownMembers: Array,
    Upvote: Number,
    Downvote: Number,
    Owner: String
});
 
module.exports = model("poll", vote);