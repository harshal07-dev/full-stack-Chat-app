import type { Request, Response } from "express";
import User from "../modals/User.ts";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.ts";
export const RegisterUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password, name, avatar } = req.body;
  try {
    // check if it already exists
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    // create new user
    user = new User({
      email,
      password,
      name,
      avatar: avatar || "",
    });

    // hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // save user
    await user.save();

    // generate token
    const token = generateToken(user);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    // find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid creadentials",
      });
      return;
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }
    // generate token
    const token = generateToken(user);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};

export const LoginUser = loginUser;
