import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach doctor ID to request
        req.doctorId = decoded.id;

        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: "Token invalid" });
    }
};

export default authDoctor;
