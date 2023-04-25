import jwt from "jsonwebtoken";
import User from "../Models/user.model";

export const isUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(400).json("No token");
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(400).json("Invalid Request");
    }
    next();
  } catch (e) {
    res.status(500).json(e);
  }
};
