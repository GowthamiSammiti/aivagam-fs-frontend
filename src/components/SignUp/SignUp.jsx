import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css"; 

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${SERVER_URL}/users/register`, 
                { email, username, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            alert(response.data.message || "Sign-up successful! Please log in.");
            navigate("/signin");
        } catch (error) {
            console.error("Sign-up error:", error.response?.data || error);
            alert(error.response?.data?.message || "Sign-up failed. Try again.");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Sign Up</button>
                </form>
                <button className="signin-btn" onClick={() => navigate("/signin")}>Already have an account? Sign In</button>
            </div>
        </div>
    );

};

export default SignUp;