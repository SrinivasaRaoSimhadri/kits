const jwt = require("jsonwebtoken");
const Voter = require("../models/voters");
const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token) {
            throw new Error("invalid token");
        }
        const decoded = jwt.verify(token, "voting");
        const { voterId } = decoded;
        const voter = await Voter.findOne({voterId: voterId})
        if(!voter) {
            throw new Error("user not found");
        }
        req.voter = voter;
        next();
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
}

module.exports = userAuth;