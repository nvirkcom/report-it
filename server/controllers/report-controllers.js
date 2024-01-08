const knex = require("knex")(require("../knexfile"));

const add = async (req, res) => {
  if (
    !req.body.content ||
    !req.body.timestamp ||
    !req.body.title ||
    !req.body.type
  ) {
    return res.status(400).json({
      message: "Required Content, Datetime, Title and Type",
    });
  }

  if (
    req.body.type !== "Markdown" &&
    req.body.type !== "Plain Text" &&
    req.body.type !== "WYSIWYG"
  ) {
    return res.status(400).json({
      message:
        "Invalid Report Type! Valid Report Types: Markdown, Plain Text and WYSISYG",
    });
  }

  try {
    const result = await knex("report").insert({
      ...req.body,
      user_id: req.user_id,
    });

    const newReportId = result[0];
    const createdReport = await knex("report").where({ id: newReportId });

    res.status(201).json(createdReport);
  } catch (error) {
    res.status(500).json({
      message: "Error! Try Again ",
    });
  }
};

const findOne = async (req, res) => {
  try {
    const reportsFound = await knex("report").where({
      id: req.params.id,
      user_id: req.user_id,
    });

    if (reportsFound.length === 0) {
      return res.status(404).json({
        message: "Report Not Found",
      });
    }

    const reportData = reportsFound[0];

    res.json(reportData);
  } catch (error) {
    res.status(500).json({
      message: "Error! Try Again",
    });
  }
};

const index = async (req, res) => {
  try {
    const data = await knex("report").where({ user_id: req.user_id });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send("Error! Try Again");
  }
};

const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("report")
      .where({ id: req.params.id, user_id: req.user_id })
      .delete();

    if (rowsDeleted === 0) {
      return res.status(404).json({ message: "Report Not Found" });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: "Error! Try Again",
    });
  }
};

const update = async (req, res) => {
  if (
    !req.body.content ||
    !req.body.timestamp ||
    !req.body.title ||
    !req.body.type
  ) {
    return res.status(400).json({
      message: "Required Content, Datetime, Title and Type",
    });
  }

  if (
    req.body.type !== "Markdown" &&
    req.body.type !== "Plain Text" &&
    req.body.type !== "WYSIWYG"
  ) {
    return res.status(400).json({
      message:
        "Invalid Report Type! Valid Report Types: Markdown, Plain Text and WYSISYG",
    });
  }

  try {
    const rowsUpdated = await knex("report")
      .where({ id: req.params.id, user_id: req.user_id })
      .update({ ...req.body, user_id: req.user_id });

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: "Report Not Found",
      });
    }

    const updatedReport = await knex("report").where({
      id: req.params.id,
    });

    res.json(updatedReport[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error! Try Again",
    });
  }
};

module.exports = {
  add,
  findOne,
  index,
  remove,
  update,
};
