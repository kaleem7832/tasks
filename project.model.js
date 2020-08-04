const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Project = new Schema(
  {
    project: {
      type: String,
      required: true,
      unique: true,
    },
    task: {
      type: String,
      required: true,
    },
    programmer: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    startdate: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true,
    },
  },
  {
    collection: "projects",
  }
);

module.exports = mongoose.model("Project", Project);
