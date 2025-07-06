import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
	const token = req.cookies.token;

	console.log("🔐 Token in protect middleware:", token);

	if (!token) {
		return res.status(401).json({ success: false, message: "No token provided" });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		console.log("✅ Decoded JWT:", decoded); // Should include decoded.id

		req.userId = decoded.id;
		next();
	} catch (err) {
		console.error("❌ JWT verification failed:", err);
		return res.status(401).json({ success: false, message: "Invalid or expired token" });
	}
};
