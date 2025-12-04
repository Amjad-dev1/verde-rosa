import { useState, useEffect } from "react";
import VideoBackground from "../components/videobackground.jsx";
import back7 from "../assets/back7.mp4";
import "../styles/donate.css";

export default function Donate() {
    const [facts, setFacts] = useState([]);
    const [treesPlanted, setTreesPlanted] = useState(0);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFacts();
        fetchTreeCounter();
    }, []);

    const fetchFacts = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/get_sustainability_facts.php");
            const data = await response.json();
            if (data.success) {
                setFacts(data.facts);
            }
        } catch (error) {
            console.error("Error fetching facts:", error);
        }
    };

    const fetchTreeCounter = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/get_tree_counter.php");
            const data = await response.json();
            if (data.success) {
                setTreesPlanted(data.treesPlanted);
            }
        } catch (error) {
            console.error("Error fetching tree counter:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDonate = async () => {
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        try {
            // Check if user is logged in
            const sessionResponse = await fetch("http://localhost:8000/api/session_check.php", {
                credentials: "include",
            });
            const sessionData = await sessionResponse.json();
            if (!sessionData.logged_in) {
                alert("Please log in to make a donation.");
                return;
            }

            const userId = sessionData.user.UserID;

            const response = await fetch("http://localhost:8000/api/donate.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    userId: parseInt(userId),
                    amount: parseFloat(amount),
                    treesPlanted: 1, // Assuming 1 tree per donation for simplicity
                }),
            });
            const data = await response.json();
            if (data.success) {
                alert("Thank you for your donation!");
                setAmount("");
                fetchTreeCounter(); // Refresh the counter
            } else {
                alert("Donation failed: " + data.message);
            }
        } catch (error) {
            console.error("Error donating:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <VideoBackground src={back7} />
            <div className="donate-container15">
                <div className="donate-center15">
                    <div className="tree-counter15">
                        <h2>{loading ? "Loading..." : treesPlanted}</h2>
                        <p>Trees Planted Worldwide</p>
                    </div>
                </div>
                <div className="donate-facts15">
                    {facts.slice(0, 4).map((fact, index) => (
                        <div key={fact.FactID} className={`fact-panel15 glass fact-panel${index + 1}15`}>
                            <h3>{fact.Title}</h3>
                            <p>{fact.Description}</p>
                        </div>
                    ))}
                </div>
                <div className="donate-form15">
                    <input
                        type="number"
                        className="donate-input15 glass"
                        placeholder="Enter donation amount ($)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button className="donate-button15" onClick={handleDonate}>
                        Donate Now
                    </button>
                </div>
            </div>
        </>
    );
}

