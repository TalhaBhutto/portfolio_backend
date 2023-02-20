import bcrypt from "bcryptjs";
import AcademicInfo from "../models/academicInfo.js";
import {
  validate,
  allProperties,
  otherProperties,
} from "../Lists/academicInfo.js";

export const postAcademicInfo = async (req, res) => {
  try {
    const academicInfo = {};
    validate.forEach((key) => {
      if (req.body[key]) academicInfo[key] = req.body[key];
      else
        return res.status(404).json({
          status: "FAILED",
          data: null,
          message: `${key} cannot be empty!`,
        });
    });
    otherProperties.forEach((key) => {
      if (req.body[key]) academicInfo[key] = req.body[key];
    });
    await AcademicInfo.create(academicInfo);
    const result = await AcademicInfo.findById(req.params.academicInfoId);
    res.status(200).json({
      status: "SUCCESS",
      data: { ...result?._doc },
      message: "Academic Info added successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const updateAcademicInfo = async (req, res) => {
  try {
    const academicInfo = {};
    allProperties.forEach((key) => {
      if (req.body[key]) academicInfo[key] = req.body[key];
    });
    await AcademicInfo.updateOne(
      { _id: req.params.academicInfoId },
      academicInfo
    );

    const result = await AcademicInfo.findById(req.params.academicInfoId);

    res.status(200).json({
      status: "SUCCESS",
      data: { ...result?._doc },
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const getAllAcademicInfo = async (req, res) => {
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
