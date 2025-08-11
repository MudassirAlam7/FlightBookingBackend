import jwt from "jsonwebtoken";
import { customResponse } from "../utils/customResponse.js";

const protect = (req, res, next) => { 
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return customResponse(res, 401, "Not authorized, no token", "Unauthorized", false, null);
    }
    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (error) {
        return customResponse(res, 401, "Not authorized, token failed", "Unauthorized", false, null);
    }
}
export default protect;