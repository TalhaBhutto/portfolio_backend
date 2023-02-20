import Skills from "../models/skills.js";
import { validate, allProperties, otherProperties } from "../Lists/skills.js";

export const postSkills = async (req, res) => {
  try {
    const skills = {};
    validate.forEach((key) => {
      if (req.body[key]) skills[key] = req.body[key];
      else
        return res.status(404).json({
          status: "FAILED",
          data: null,
          message: `${key} cannot be empty!`,
        });
    });
    otherProperties.forEach((key) => {
      if (req.body[key]) skills[key] = req.body[key];
    });
    await Skills.create(skills);
    const result = await Skills.findById(req.params.skillsId);
    res.status(200).json({
      status: "SUCCESS",
      data: { ...result?._doc },
      message: "Skills added successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const updateSkills = async (req, res) => {
  try {
    const skills = {};
    allProperties.forEach((key) => {
      if (req.body[key]) skills[key] = req.body[key];
    });
    await Skills.updateOne({ _id: req.params.skillsId }, skills);

    const result = await Skills.findById(req.params.skillsId);

    res.status(200).json({
      status: "SUCCESS",
      data: { ...result?._doc },
      message: "Skills updated successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const getAllSkills = async (req, res) => {
  try {
    const allSkills = await Skills.find({ userId: req.UID });
    res.status(200).json({
      status: "SUCCESS",
      data: allSkills,
      message: "All Skills",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const getSkills = async (req, res) => {
  try {
    const skills = await Skills.findById(req.params.skillsId);
    res.status(200).json({
      status: "SUCCESS",
      data: skills,
      message: "All Skills",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const deleteSkills = async (req, res) => {
  try {
    await Skills.deleteOne({
      id: req.params.skillsId,
    });
    res.status(200).json({
      status: "SUCCESS",
      data: {},
      message: "Deleted Skills",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};
