import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../Models/index.js";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;
    const validUser = await User.findOne({ email });

    if (validUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      userName,
      email,
      password: hashedPassword,
    });
    await user.save();
    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      userId: user._id,
      userName: user.userName,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName && !email && !password) {
      return res.status(400).json({ message: "No fields to update" });
    }
    if (password) {
      const verifyPassword = await bcrypt.compare(password, req.user.password);
      if (!verifyPassword) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { userName, email, password },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "User details updated successfully", user: updatedUser })
      .select("-password");
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    return res
      .status(200)
      .json({ message: "User details fetched successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
