import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

// signin
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    // if user does not exist return
    if (!existingUser)
      return res.status(404).json({
        status: "FAILED",
        data: existingUser,
        message: "User doesn't exist",
      });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    // if passwords do not match, return
    if (!isPasswordCorrect)
      return res.status(400).json({
        status: "FAILED",
        data: null,
        message: "Invalid Credentials.",
      });
    // if user is not verified, return
    if (!existingUser?.isVerified)
      return res
        .status(400)
        .json({ status: "FAILED", data: null, message: "User not verified." });
    // if user if not active, return
    if (!existingUser?.isActive)
      return res
        .status(400)
        .json({ status: "FAILED", data: null, message: "User not active." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    const existingRole = await Role.findOne({
      userId: existingUser?._id,
      isActive: true,
    });
    if (!existingRole) {
      return res.status(400).json({
        status: "FAILED",
        data: null,
        message: "User has no role.",
      });
    } else {
      res.status(200).json({
        status: "SUCCESS",
        data: {
          existingUser: { ...existingUser?._doc, token: "Bearer " + token },
        },
        message: "signin success",
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

// update profile
export const updateProfile = async (req, res) => {
  const {
    name,
    dob,
    country,
    phone,
    desiredRole,
    preferredCategory,
    intro,
    email,
    password,
  } = req.body;
  try {
    const existingUser = await User.findById(req.UID);
    if (!existingUser)
      return res.status(400).json({
        status: "FAILED",
        data: null,
        message: "User does not exist.",
      });
    if (email != existingUser?.email && email) {
      await User.updateOne({ _id: req.UID }, { email, isVerified: false });
      const result = await User.findById(res?.UID);
      sendVerificationEmail({ _id: req.UID, email: email }, result, res);
      return null;
    }
    if (password) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordCorrect) {
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.updateOne(
          { _id: req.UID },
          {
            password: hashedPassword,
          }
        );
        return res.status(200).json({
          status: "SUCCESS",
          data: null,
          message: "Password updated successfully.",
        });
      }
    }
    await User.updateOne(
      { _id: req.UID },
      {
        name: name ? name : existingUser?.name,
        dob: dob ? dob : existingUser?.dob,
        country: country ? country : existingUser?.country,
        phone: phone ? phone : existingUser?.phone,
        desiredRole: desiredRole ? desiredRole : existingUser?.desiredRole,
        preferredCategory: preferredCategory
          ? preferredCategory
          : existingUser?.preferredCategory,
        intro: intro ? intro : existingUser?.intro,
      }
    );

    const result = await User.findById(req.UID).populate("role");

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      status: "SUCCESS",
      data: {
        existingUser: { ...result?._doc, token: "Bearer " + token },
      },
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const { userId } = req?.params;
    const superAdminRole = await Role.findOne({
      user: req.UID,
      role: "superAdmin",
      isActive: true,
    });
    if (!superAdminRole) {
      return res.status(401).json({
        status: "FAILED",
        data: null,
        message: "User unauthenticated.",
      });
    }
    const existingUser = await User.findById(userId).populate("role");
    if (!existingUser) {
      res.status(400).json({
        status: "FAILURE",
        data: null,
        message: "User does not exist",
      });
    }
    res.status(200).json({
      status: "SUCCESS",
      data: existingUser,
      message: "All Users",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};
