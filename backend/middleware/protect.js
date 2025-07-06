// middleware/protect.js
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
	const token = req.cookies.token;
	console.log("🍪 Token in middleware:", token);

	if (!token) {
		return res.status(401).json({ success: false, message: "No token provided" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log("✅ Decoded JWT:", decoded);

		req.userId = decoded.id; // ✅ THIS LINE IS CRITICAL
		next();
	} catch (err) {
		console.error("❌ JWT verification failed:", err.message);
		return res.status(401).json({ success: false, message: "Invalid or expired token" });
	}
};
