import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignIn.css"; 

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${SERVER_URL}/users/login`, 
                { email, password }
            );
            localStorage.setItem("token", response.data.token);

            navigate("/todos"); 
        } catch (error) {
            console.error("Sign-in error:", error.response?.data || error);
            alert("Invalid credentials!");
        }
    };
    return (
        <div className="signin-container">
            <div className="signin-box">
                <h2>Sign In</h2>
                <form onSubmit={handleSignIn}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
  
};

export default SignIn;