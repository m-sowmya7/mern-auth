import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");
        if (code) {
            fetch("http://localhost:5000/auth/google/callback", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // if you use cookies for auth
                body: JSON.stringify({ code }),
            })
                .then(res => res.json())
                .then(data => {
                    // If you use JWT, store it: localStorage.setItem('token', data.token);
                    navigate("/dashboard");
                })
                .catch(() => {
                    // Optionally handle error
                    navigate("/login");
                });
        } else {
            navigate("/login");
        }
    }, [location, navigate]);

    return (
        <div>Authenticating with Google...</div>
    );
};

export default GoogleAuth;