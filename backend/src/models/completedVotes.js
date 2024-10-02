const mongoose = require("mongoose");
const completedVotesSchema =  new mongoose.Schema({
    voterId: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

const CompletedVoter = mongoose.models?.CompletedVote || mongoose.model("CompletedVoter", completedVotesSchema);
module.exports = CompletedVoter;