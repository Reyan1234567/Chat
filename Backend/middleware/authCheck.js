import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authCheck = (req, res, next) => {
  const token = req.cookies.accessToken;
  try {
        jwt.verify(token, process.env.SECRET_KEY)
        res.status(200).send("Token found")
        
    }
    catch (err) {
        console.log("Token verification failed:", err.message);
        return res.status(404).send("Token Not found")
  }
  next()
};
