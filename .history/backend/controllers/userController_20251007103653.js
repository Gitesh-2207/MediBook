import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

//api to register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    if (password.length < 0) {
      return res.json({ success: false, message: "Enter a strong password" });
    }
    // hashing use password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser=new userModel(userData)
    const user=await newUser.save()
    //-id
    
  } catch (error) {}
};
