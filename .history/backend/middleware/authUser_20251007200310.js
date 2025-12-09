import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Not authorized, please login again" });
    }

    // ✅ Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Attach user ID to the request
    req.body.userId = decodedToken.id;

    // ✅ Move to next middleware or controller
    next();

  } catch (error) {
    console.error("Auth Error:", error);
    res.json({ success: false, message: "Authentication failed: " + error.message });
  }
};

export default authUser;
