import express from "express";
import { validateUserMiddleware } from "../middleware/validationFactory.js";
import { User } from "../models/user.js";

const router = express.Router();

router.post("/", validateUserMiddleware, async (req, res) => {
  try {
    let existingUser = await User.findOne({ email: req.validatedData.userEmail });
    
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    
    const newUser = new User({
      name: req.validatedData.userName,
      email: req.validatedData.userEmail,
      password: req.validatedData.userPassword
    });

    await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
