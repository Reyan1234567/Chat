import { Router } from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import refresh from "../models/refresh.model.js";
const router = Router();
router.use(cookieParser());

router.get("/refresh", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const response = await refresh.findOne({ token: refreshToken });
    if (!response) {
      return res.status(404).send("Not found");
    }
    const accessToken = jwt.sign(
      { userId: response.userId },
      process.env.SECRET_KEY,
      { expires: "1h" }
    );
    res.cookie("accessToken", accessToken, {
      expires: "1h",
      httpOnly: true,
      secure: true,
    });
    res.status(200).json(accessToken);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

export default router;
