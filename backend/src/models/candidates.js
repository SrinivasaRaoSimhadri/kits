const mongoose = require("mongoose");
const candidateSchema = new mongoose.Schema({
    candidateId: {
        type: String,
        required: true,
        unique: true
    },
    canditateName: {
        type: String,
        required: true
    },
    NoOfVotes: {
        type: Number,
        default:0
    },
    partySymbol: {
        type: String, 
        required: true
    }
},{
    timestamps: true
})

const Candidate = mongoose.models?.Candidate || mongoose.model("Candidate", candidateSchema);
module.exports = Candidate;