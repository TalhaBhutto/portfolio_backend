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
      message: "Academic Info updated successfully",
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
    const allAcademicInfo = await AcademicInfo.find({ userId: req.UID });
    res.status(200).json({
      status: "SUCCESS",
      data: allAcademicInfo,
      message: "All Academic Info",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const getAcademicInfo = async (req, res) => {
  try {
    const academicInfo = await AcademicInfo.findById(req.params.academicInfoId);
    res.status(200).json({
      status: "SUCCESS",
      data: academicInfo,
      message: "All Academic Info",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const deleteAcademicInfo = async (req, res) => {
  try {
    await AcademicInfo.deleteOne({
      id: req.params.academicInfoId,
    });
    res.status(200).json({
      status: "SUCCESS",
      data: {},
      message: "Deleted Academic Info",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};
