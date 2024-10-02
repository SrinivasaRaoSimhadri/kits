const express = require("express");
const ConnectDb = require("./config/database");
const jwt = require("jsonwebtoken");
const Voter = require("./models/voters");
const userAuth = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const CompletedVoter = require("./models/completedVotes");
const Candidate = require("./models/candidates");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.post("/", async (req, res) => {
    try{
        const { voterId } = req.body;
        const voter = await Voter.findOne({
            voterId: voterId,
        });
        if(!voterId) {
            throw new Error("Invalid credintials");
        }
        const token = jwt.sign({voterId: voter.voterId}, "voting", {expiresIn: "1d"})
        res.cookie("token", token);
        res.json({voterId:  voter.voterId});
    } catch(error) {
        res.status(400).send("Error: " + error.message);
    }
})

app.post("/authenticate", userAuth ,async (req, res) => {
    try {
        const voter = req.voter;
        const { pin } = req.body;
        
        if(pin !== voter.pin) {
            throw new Error("invalid credintials");
        }
        
        res.send({
            voterId:  voter.voterId,
        });
    } catch(error) {
        res.status(400).send("Error: " + error.message);
    }
})


app.post("/vote", userAuth ,async (req, res) => {
    try {
        const voter = req.voter;
        const voterId = voter.voterId;
        const isVotedUser = await CompletedVoter.findOne({
            voterId: voterId
        });
        if(isVotedUser) {
            throw new Error("Already voted");
        }
        const { candidateId } = req.body;
        const completedVoter = new CompletedVoter({voterId: voter.voterId});
        await completedVoter.save();
        const candidate = await Candidate.findOne({
            candidateId: candidateId
        });
        candidate.NoOfVotes = candidate.NoOfVotes + 1;
        await candidate.save();
        res.send(`voted to ${candidate.canditateName} successfully`);
    } catch(error) {
        res.status(400).send("Error: " + error.message);
    }
})

app.get("/candidates",async (req, res)=> {
    try {
        const candidates  = await Candidate.find({});
        res.send(candidates);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
})

app.post("/exit", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    })
    res.send("voted successfully");
})


const Start = async () => {
    try{
        await ConnectDb();
        app.listen(3000, () => {
            console.log("listening to port 3000")
        })
    } catch(error) {
        console.log(error.message);
    }
}
Start();