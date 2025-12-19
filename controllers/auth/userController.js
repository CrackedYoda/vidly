import User from "../../models/user.js";
import Customers from "../../models/customer.js";
import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";
export const addUser = async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      userEmail: req.validatedData.userEmail,
    });

    if (existingUser) {
      return res.status(400).send("User with this email already exists");
    }
    const userPhone = await User.findOne({
      userPhone: req.validatedData.userPhone,
    });
    if (userPhone) {
      return res.status(400).send("User with this phone number already exists");
    }
    const customerPhone = await Customers.findOne({
      phone: req.validatedData.userPhone,
    });
    if (customerPhone) {
      return res
        .status(400)
        .send("Phone number already associated with a customer");
    }
    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(
      req.validatedData.userPassword,
      salt
    );

    const newUser = new User({
      userName: req.validatedData.userName,
      userEmail: req.validatedData.userEmail,
      userPassword: hashedPassword,
      userPhone: req.validatedData.userPhone,
    });

    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findById(req.user.id).select("-userPassword");
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-userPassword");

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateData = {
      userName: req.validatedData.userName,
      userEmail: req.validatedData.userEmail,
    };

    // Hash password if provided
    if (req.validatedData.userPassword) {
      const salt = await bcrypt.genSalt(10);
      updateData.userPassword = await bcrypt.hash(
        req.validatedData.userPassword,
        salt
      );
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).select("-userPassword");

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ userEmail: req.body.userEmail });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(
      req.body.userPassword,
      user.userPassword
    );

    if (!validPassword) {
      return res.status(401).send("Invalid email or password");
    }
    // Jwt sign and send token in cookie
    const token = jwt.sign({ id: user._id }, config.get("JWT_SECRET"), {
      expiresIn: "1h",
    });
    res.cookie("usertoken", token, { httpOnly: true, maxAge: 3600000, sameSite: "Strict", secure: false });
    // res.json({ token });
    // console.log(token);
    res.send("Login successful");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
