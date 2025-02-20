import { Router } from "express";
import user from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import refresh from "../models/refresh.model.js";
// import { userSchema } from "../Schemas/user.schema.js";
// import { validationResult, checkSchema } from "express-validator";

const router = Router();
dotenv.config();
const salt = bcrypt.genSaltSync(10);

router.post("/login", async (req, res) => {
  const { body } = req;
  try {
    const User = await user.findOne({ email: body.email });
    if (!User) {
      return res.status(404).send("Invalid Credentials");
    }
    const compareResult = bcrypt.compareSync(body.password, User.password);
    if (!compareResult) {
      return res.status(404).send("Invalid credentails");
    } else {
      res.cookie("user_id",User._id)
      const accessToken = jwt.sign(
        { userId: User._id},
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      const refreshToken = jwt.sign(
        { userId: User._id},
        process.env.REF_SECRET_KEY,
        { expiresIn: "7d" }
      );
      res.cookie("accessToken", accessToken, {
        expiresIn: "1h",
        httpOnly: true,
        secure: true,
      });
      res.cookie("refreshToken", refreshToken, {
        expiresIn: "3d",
        httpOnly: true,
        secure: true,
      });
      await refresh.create({
        userId: User._id,
        token: refreshToken,
      });
      res.status(201).json({"accessToken": accessToken, "refreshToken":refreshToken});
    }
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { body } = req;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!body.fullName || !body.email || !body.password) {
      console.log("All fields are required");
      return res.status(404).send("All fields are required");
    }
    if (!emailRegex.test(body.email)) {
      console.log("Enter a valid email");
      return res.status(404).send("Enter a valid email");
    }
    if (body.password.length < 6) {
      console.log("The password must be greater than six characters");
      return res
        .status(404)
        .send("The password must be greater than six characters");
    }
    const hash = bcrypt.hashSync(body.password, salt);
    const response = new user({ ...body, password: hash });
    const newUser = await response.save();
    res.status(201).send(newUser);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

export default router;

//794u5hj4
