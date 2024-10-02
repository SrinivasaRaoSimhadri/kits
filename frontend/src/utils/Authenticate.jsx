import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Authenticate = () => {
    const [pin, setPin] = useState("");
    const [iswrongPin, setIsWrongPin] = useState(false);
    const navigate  = useNavigate();
    const verifyPin = async () => {
        try {
            const response = await fetch("http://localhost:3000/authenticate", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({pin}),
                credentials: "include"
            })
            if(!response.ok) {
                throw new Error("invalid pin");
            }
            return navigate("/vote");
        } catch(error) {
            setIsWrongPin(true);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col gap-3 bg-base-300 px-[80px] py-[40px] border border-gray-600 rounded min-w-[500px]">
                <div className="flex justify-center">
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Enter your pin: </span>
                        </div>
                        <input type="password" value = {pin} onChange={(e) => setPin(e.target.value)} className="input input-bordered w-full min-w-[200px]" />
                    </label>
                </div>
                {
                    iswrongPin && (
                        <div className="text-center mt-1 bg-red-400 text-white px-3 py-1 max-w-[100px] mx-auto rounded-md">Invalid pin</div>
                    )
                }
                <button onClick={verifyPin} className="mt-3 bg-gray-700 p-2 px-4 max-w-[100px] mx-auto rounded-md">Vote</button>
            </div>
        </div>
    )
}

export default Authenticate;