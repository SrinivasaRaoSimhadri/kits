const mongoose = require("mongoose");
const votersSchema = new mongoose.Schema({
    voterId: {
        type: String,
        required: true,
        unique: true
    },
    voterName: {
        type: String,
        required: true
    },
    pin :{
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Voter = mongoose.models?.Voter || mongoose.model("Voter", votersSchema);
module.exports = Voter;