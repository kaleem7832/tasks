const express = require("express");
const projectsRoutes = express.Router();

// Require Business model in our routes module
let Project = require("./project.model");
let Task = require("./taskhistory");

// Defined store route
projectsRoutes.route("/add").post(function (req, res) {
  let project = new Project(req.body);
  let task = new Task(req.body);
  project.last = task._id;
  project
    .save()
    .then((project) => {
      task
        .save()
        .then((task) => {})
        .catch((err) => {
          res.status(400).send(err);
        });
      res.status(200).send(project);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Defined get data(index or listing) route
projectsRoutes.route("/").get(function (req, res) {
  Project.find(function (err, projects) {
    if (err) {
      console.log(err);
    } else {
      res.json(projects);
    }
  });
});

module.exports = projectsRoutes;
