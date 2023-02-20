import CareerInfo from "../models/careerInfo.js";
import {
  validate,
  allProperties,
  otherProperties,
} from "../Lists/careerInfo.js";

export const postCareerInfo = async (req, res) => {
  try {
    const careerInfo = {};
    validate.forEach((key) => {
      if (req.body[key]) careerInfo[key] = req.body[key];
      else
        return res.status(404).json({
          status: "FAILED",
          data: null,
          message: `${key} cannot be empty!`,
        });
    });
    otherProperties.forEach((key) => {
      if (req.body[key]) careerInfo[key] = req.body[key];
    });
    await CareerInfo.create(careerInfo);
    const result = await CareerInfo.findById(req.params.careerInfoId);
    res.status(200).json({
      status: "SUCCESS",
      data: { ...result?._doc },
      message: "Career Info added successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const updateCareerInfo = async (req, res) => {
  try {
    const careerInfo = {};
    allProperties.forEach((key) => {
      if (req.body[key]) careerInfo[key] = req.body[key];
    });
    await CareerInfo.updateOne({ _id: req.params.careerInfoId }, careerInfo);

    const result = await CareerInfo.findById(req.params.careerInfoId);

    res.status(200).json({
      status: "SUCCESS",
      data: { ...result?._doc },
      message: "Career Info updated successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const getAllCareerInfo = async (req, res) => {
  try {
    const allCareerInfo = await CareerInfo.find({ userId: req.UID });
    res.status(200).json({
      status: "SUCCESS",
      data: allCareerInfo,
      message: "All Career Info",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const getCareerInfo = async (req, res) => {
  try {
    const careerInfo = await CareerInfo.findById(req.params.careerInfoId);
    res.status(200).json({
      status: "SUCCESS",
      data: careerInfo,
      message: "All Career Info",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const deleteCareerInfo = async (req, res) => {
  try {
    await CareerInfo.deleteOne({
      id: req.params.careerInfoId,
    });
    res.status(200).json({
      status: "SUCCESS",
      data: {},
      message: "Deleted Career Info",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};
