import userModel from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).send(error);
    } else {
      const photo = req.file.path;
      const hashedPassword = bcrypt.hashSync(password, 10);

      const getUser = await userModel.findOne({ email });

      if (getUser) {
        res.status(200).json("Email already exists");
      }

      const user = new userModel({
        name: name,
        email: email,
        password: hashedPassword,
        photo: photo,
      });
      const success = await user.save();
      return res.status(200).json({ success });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json("No user with entered email exists");
    } else {
      const payload = { id: user._id, email: user.email };
      const options = { expiresIn: "1d" };
      const token = jwt.sign(payload, process.env.JWT_SECRET, options);
      const compare = bcrypt.compareSync(password, user.password);

      if (!compare) {
        return res.status(400).json("Password doesn't match");
      } else {
        return res
          .status(200)
          .json({ message: "Logged in successfully", token: token });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAll = async (req, res) => {
  try {
    const user = await userModel.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;
    const user = await userModel.findByIdAndUpdate(id, {
      email: email,
      name: name,
      password: password,
    });
    res.status(200).json(user).send("Updated sucessfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    res.status(200).json(user).send("deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
};
