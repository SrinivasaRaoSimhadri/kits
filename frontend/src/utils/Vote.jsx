import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Vote = () => {
    const [candidates, setCandidates] = useState([]);
    const [isVoted, setIsVoted] = useState(false);
    const navigate = useNavigate();
    const getCandidates = async () => {
        try {
            const response = await fetch("http://localhost:3000/candidates",{
                credentials: "include"
            });
            if(!response.ok) {
                throw new Error("coudnt get candidates");
            }
            const participants = await response.json();
            setCandidates(participants);
        } catch(error) {
            console.log("Error: ", error);
        }
    }

    const vote = async (candidateId) => {
        console.log(candidateId);
        try {
            const response = await fetch("http://localhost:3000/vote", {
                method: "POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify({candidateId}),
                credentials: "include"
            })
            if(!response.ok) {
                throw new Error("voting failed");
            }
            setIsVoted(true);
            await fetch("http://localhost:3000/exit", {credentials: "include" })
            setTimeout(()=> {
                navigate("/");
            }, 3000);
        } catch (error) {
            console.log("Error: ", error);
        }
    }
    useEffect(()=> {
        getCandidates();
    }, []);
    return (
        <div className="max-w-[800px] bg-base-300 mx-auto m-4 rounded  py-9">
            <div className="flex justify-between px-6">
                <h1>Candidate Name</h1>
                <h1>Party symbol</h1>
                <h1>vote here</h1>
            </div>
            {
                isVoted && (
                    <h1 className="bg-green-500 px-3 py-2 max-w-fit mx-auto text-white rounded mt-4">voted successfully!</h1>
                )
            }
            {
                candidates?.map((candidate, index) => {
                    return (
                        <div key={index} className="flex items-center justify-between mt-5 bg-base-200 p-3 rounded-md min-h-[100px] m-5">
                            <h1>{candidate.canditateName}</h1>
                            <img className="rounded-full max-w-[100px] max-h-[100px]" alt="party symbol" src={candidate.partySymbol}/>
                            <button onClick={() => {console.log("button button");vote(candidate.candidateId)}} className="bg-green-900 py-2 px-10 rounded-md text-white hover:bg-green-500 duration-300">vote</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Vote;