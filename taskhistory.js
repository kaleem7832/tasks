const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Task = new Schema(
  {
    project: {
      type: String,
      text: true,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: false,
    },
    programmer: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    starttime: {
      type: String,
      required: false,
    },
    endtime: {
      type: String,
      required: false,
    },
  },
  {
    collection: "tasks",
  }
);

module.exports = mongoose.model("Task", Task);
