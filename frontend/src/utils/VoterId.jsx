import { useState } from "react";
import { useNavigate } from "react-router-dom";
const VoterId = () => {
    const [voterId, setVoterId] = useState("");
    const [isWrongVoterId, setIsWrongVoterId] = useState(false);
    const navigate = useNavigate();
    const getVoter = async () => {
        try {
            const response = await fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({voterId}),
                credentials: "include"
            })
            if(!response.ok) {
                throw new Error("User not found");
            } 
            return navigate("/authenticate");
        } catch (error) {
            setIsWrongVoterId(true);
        }
    }
    return(
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col gap-3 bg-base-300 px-[80px] py-[40px] border border-gray-600 rounded min-w-[500px]">
                <h1 className="text-center">Online voting system</h1>
                <div className="flex justify-center">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Enter your VoterId: </span>
                        </div>
                        <input type="text" value = {voterId} onChange={(e) => setVoterId(e.target.value)} className="input input-bordered w-full min-w-[200px]" />
                    </label>
                </div>
                {
                    isWrongVoterId && (
                        <div className="text-center mt-1 bg-red-400 text-white px-3 py-1 max-w-fit mx-auto rounded-md">Invalid VoterId</div>
                    )
                }
                <button onClick={getVoter} className="mt-3 bg-gray-700 p-2 px-4 max-w-[100px] mx-auto rounded-md">Submit</button>
            </div>
        </div>
    )
}

export default VoterId;