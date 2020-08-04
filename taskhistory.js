const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Task = new Schema(
  {
    project: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
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
    starttime: {
      type: String,
      required: true,
    },
    endtime: {
      type: String,
      //required: true,
    },
  },
  {
    collection: "tasks",
  }
);

module.exports = mongoose.model("Task", Task);
