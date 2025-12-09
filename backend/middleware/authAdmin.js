import jwt from "jsonwebtoken";

// admin
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({ success: false, message: "Not authorized, please login again" });
    }

    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    // ✅ Ensure token matches correct admin credentials
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Not authorized, please login again" });
    }

    next();
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    res.json({ success: false, message: "Not authorized, invalid or expired token" });
  }
};

export default authAdmin;
