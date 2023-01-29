import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Getting dot.env to add keys
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.UID = decodedData?.id;
    } else {
      return res.status(401).json({
        status: "FAILED",
        data: null,
        message: "User unauthenticated.",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      status: "FAILED",
      data: null,
      message: "User unauthenticated.",
    });
  }
};

export default auth;
