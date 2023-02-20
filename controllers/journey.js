import Journey from "../models/journey.js";
import { validate, allProperties, otherProperties } from "../Lists/journey.js";

export const postJourney = async (req, res) => {
  try {
    const journey = {};
    validate.forEach((key) => {
      if (req.body[key]) journey[key] = req.body[key];
      else
        return res.status(404).json({
          status: "FAILED",
          data: null,
          message: `${key} cannot be empty!`,
        });
    });
    otherProperties.forEach((key) => {
      if (req.body[key]) journey[key] = req.body[key];
    });
    await Journey.create(journey);
    const result = await Journey.findById(req.params.journeyId);
    res.status(200).json({
      status: "SUCCESS",
      data: { ...result?._doc },
      message: "Journey added successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const updateJourney = async (req, res) => {
  try {
    const journey = {};
    allProperties.forEach((key) => {
      if (req.body[key]) journey[key] = req.body[key];
    });
    await Journey.updateOne({ _id: req.params.journeyId }, journey);

    const result = await Journey.findById(req.params.journeyId);

    res.status(200).json({
      status: "SUCCESS",
      data: { ...result?._doc },
      message: "Journey updated successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const getAllJourney = async (req, res) => {
  try {
    const allJourney = await Journey.find({ userId: req.UID });
    res.status(200).json({
      status: "SUCCESS",
      data: allJourney,
      message: "All Journey",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const getJourney = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.journeyId);
    res.status(200).json({
      status: "SUCCESS",
      data: journey,
      message: "All Journey",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};

export const deleteJourney = async (req, res) => {
  try {
    await Journey.deleteOne({
      id: req.params.journeyId,
    });
    res.status(200).json({
      status: "SUCCESS",
      data: {},
      message: "Deleted Journey",
    });
  } catch (e) {
    res
      .status(500)
      .json({ status: "FAILED", data: null, message: "Something went wrong." });
  }
};
