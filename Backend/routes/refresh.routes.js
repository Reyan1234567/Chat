import { Router } from "express";
import jwt from "jsonwebtoken";
import refresh from "../models/refresh.model.js";
const router = Router();
router.get("/refresh", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    console.log(req.cookies)
    console.log(refreshToken)
    const response = await refresh.findOne({ token: refreshToken });
    console.log(response)
    if (!response) {
      return res.status(404).send("Not found");
    }
    const accessToken = jwt.sign(
      { userId: response.userId },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    console.log(accessToken)
    res.cookie("accessToken", accessToken, {
      expiresIn: "1h",
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
