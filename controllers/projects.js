import Projects from "../models/projects.js";
import { validate, allProperties, otherProperties } from "../Lists/projects.js";

export const postProjects = async (req, res) => {
  try {
    const projects = {};
    validate.forEach((key) => {
      if (req.body[key]) projects[key] = req.body[key];
      else
        return res.status(404).json({
          status: "FAILED",
          data: null,
          message: `${key} cannot be empty!`,
        });
    });
    otherProperties.forEach((key) => {
      if (req.body[key]) projects[key] = req.body[key];
    });
    await Projects.create(projects);
    const result = await Projects.findById(req.params.projectsId);
    res.status(200).json({
      status: "SUCCESS",
      data: { ...result?._doc },
      message: "Projects added successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const updateProjects = async (req, res) => {
  try {
    const projects = {};
    allProperties.forEach((key) => {
      if (req.body[key]) projects[key] = req.body[key];
    });
    await Projects.updateOne({ _id: req.params.projectsId }, projects);

    const result = await Projects.findById(req.params.projectsId);

    res.status(200).json({
      status: "SUCCESS",
      data: { ...result?._doc },
      message: "Projects updated successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Projects.find({ userId: req.UID });
    res.status(200).json({
      status: "SUCCESS",
      data: allProjects,
      message: "All Projects",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Projects.findById(req.params.projectsId);
    res.status(200).json({
      status: "SUCCESS",
      data: projects,
      message: "All Projects",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const deleteProjects = async (req, res) => {
  try {
    await Projects.deleteOne({
      id: req.params.projectsId,
    });
    res.status(200).json({
      status: "SUCCESS",
      data: {},
      message: "Deleted Projects",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};
