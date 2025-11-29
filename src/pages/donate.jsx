import { useState, useEffect } from "react";
import VideoBackground from "../components/videobackground.jsx";
import back from "../assets/back.mp4";
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
            <VideoBackground src={back} />
            <div className="donate-panels">
                <div className="donate-hero">
                    <h1>Sustainability</h1>
                    <p>Plant a tree, nurture the earth. Your donation helps create a greener future.</p>
                    <div className="blurred-circle-donate"></div>
                </div>
            </div>
            <div className="donate-panels">
                <div className="donate-facts">
                    {facts.slice(0, 3).map((fact) => (
                        <div key={fact.FactID} className="fact-card">
                            <h3>{fact.Title}</h3>
                            <p>{fact.Description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="donate-panels">
                <div className="donate-form">
                    <input
                        type="number"
                        className="donate-input"
                        placeholder="Enter donation amount ($)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <button className="donate-button" onClick={handleDonate}>
                        Donate Now
                    </button>
                </div>
            </div>
            <div className="donate-panels">
                <div className="tree-counter">
                    <h2>{loading ? "Loading..." : treesPlanted}</h2>
                    <p>Trees Planted Worldwide</p>
                </div>
            </div>
        </>
    );
}

