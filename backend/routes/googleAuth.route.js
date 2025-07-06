import express from "express";
import pkg from "supertokens-node/recipe/thirdparty";
const { ThirdParty, ThirdPartyEmailPassword } = pkg;
import User from "../models/user.model.js";
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
const router = express.Router();

// This endpoint will be called after Google OAuth callback
router.post('/google/callback', async (req, res) => {
    // req.body will have SuperTokens user info after successful OAuth
    console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
    console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const { email } = req.body;
    // const { code } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
        user = new User({
            email,
            name: req.body.name || "Google User",
            // password: "", // No password, since OAuth
            isVerified: true,
            authProvider: "google",
            // Other fields as needed
        });
        await user.save();
    }

    // Generate your own session token here
    // e.g., const token = generateSessionToken(user);
    // res.json({ token });

    // For now, just send OK
    res.json({ message: "OAuth login successful", user });
});

router.get('/google', (req, res) => {
    const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
        `redirect_uri=http://localhost:5000/auth/google/callback&` +  // <- This MUST match the one in Google Console
        `response_type=code&` +
        `scope=email%20profile&` +
        `access_type=offline&` +
        `prompt=consent`;

    res.redirect(redirectUrl);
});


// router.get('/google/callback', async (req, res) => {
//     const code = req.query.code;

//     const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
//         code,
//         client_id: process.env.GOOGLE_CLIENT_ID,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET,
//         redirect_uri: 'http://localhost:5000/auth/google/callback',
//         grant_type: 'authorization_code',
//     });

//     const { access_token } = tokenRes.data;

//     const userInfoRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`);
//     const userData = userInfoRes.data;

//     // Handle login or registration logic
//     res.json(userData);
// });
// Example GET /auth/google/callback
import jwt from "jsonwebtoken";

router.get('/google/callback', async (req, res) => {
    const code = req.query.code;
    console.log("🔁 Google OAuth callback triggered");
    console.log("📥 Received code:", code);

    try {
        // 1. Exchange code for access token
        const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: 'http://localhost:5000/auth/google/callback',
            grant_type: 'authorization_code',
        });

        const { access_token } = tokenRes.data;
        console.log("✅ Access token received from Google:", access_token ? "✔" : "❌");

        // 2. Fetch user info from Google
        const userInfoRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
        );

        const { email, name } = userInfoRes.data;
        console.log("📧 Google user email:", email);
        console.log("👤 Google user name:", name);

        // 3. Find or create user in database
        let user = await User.findOne({ email });
        if (!user) {
            console.log("🆕 User not found. Creating new user...");
            user = new User({
                email,
                name,
                isVerified: true,
                authProvider: "google"
            });
            await user.save();
            console.log("✅ New user saved:", user._id);
        } else {
            console.log("✅ Existing user found:", user._id);
        }

        // 4. Generate JWT
        const jwtPayload = { id: user._id };
        const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        console.log("🔐 JWT Token generated:", jwtToken);

        // 5. Set cookie with token
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            sameSite: "lax"
        });

        console.log("🍪 Cookie set with token");

        // 6. Redirect to frontend
        console.log("🔁 Redirecting to: http://localhost:5173/dashboard");
        res.redirect("http://localhost:5173/dashboard");

    } catch (err) {
        console.error("❌ OAuth login failed:", err.response?.data || err.message || err);
        res.status(500).send("OAuth login failed");
    }
});




export default router;