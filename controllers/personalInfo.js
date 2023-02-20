import PersonalInfo from "../models/personalInfo.js";
import {
  validate,
  allProperties,
  otherProperties,
} from "../Lists/personalInfo.js";

export const postPersonalInfo = async (req, res) => {
  try {
    const personalInfo = {};
    validate.forEach((key) => {
      if (req.body[key]) personalInfo[key] = req.body[key];
      else
        return res.status(404).json({
          status: "FAILED",
          data: null,
          message: `${key} cannot be empty!`,
        });
    });
    otherProperties.forEach((key) => {
      if (req.body[key]) personalInfo[key] = req.body[key];
    });
    await PersonalInfo.create(personalInfo);
    const result = await PersonalInfo.findById(req.params.personalInfoId);
    res.status(200).json({
      status: "SUCCESS",
      data: { ...result?._doc },
      message: "Personal Info added successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const updatePersonalInfo = async (req, res) => {
  try {
    const personalInfo = {};
    allProperties.forEach((key) => {
      if (req.body[key]) personalInfo[key] = req.body[key];
    });
    await PersonalInfo.updateOne(
      { _id: req.params.personalInfoId },
      personalInfo
    );

    const result = await PersonalInfo.findById(req.params.personalInfoId);

    res.status(200).json({
      status: "SUCCESS",
      data: { ...result?._doc },
      message: "Personal Info updated successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const getAllPersonalInfo = async (req, res) => {
  try {
    const allPersonalInfo = await PersonalInfo.find({ userId: req.UID });
    res.status(200).json({
      status: "SUCCESS",
      data: allPersonalInfo,
      message: "All Personal Info",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const getPersonalInfo = async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.findById(req.params.personalInfoId);
    res.status(200).json({
      status: "SUCCESS",
      data: personalInfo,
      message: "All Personal Info",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const deletePersonalInfo = async (req, res) => {
  try {
    await PersonalInfo.deleteOne({
      id: req.params.personalInfoId,
    });
    res.status(200).json({
      status: "SUCCESS",
      data: {},
      message: "Deleted Personal Info",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};
