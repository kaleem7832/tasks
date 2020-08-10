const express = require("express");
const taskRoutes = express.Router();

// Require Business model in our routes module
let Project = require("./project.model");
let Task = require("./taskhistory");

// Defined store route
taskRoutes.route("/add").post(function (req, res) {
  let task = new Task(req.body);

  task
    .save()
    .then((task) => {
      res.status(200).send(task);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

// Defined edit route
// taskRoutes.route("/edit/:id").get(function (req, res) {
//   let id = req.params.id;
//   Task.findById(id, function (err, task) {
//     res.json(task);
//   });
// });

//  Defined update route
taskRoutes.route("/update/:id").post(function (req, res) {
  Task.findById(req.params.id, function (err, task) {
    if (!task) res.status(404).send("data is not found");
    else {
      task.status = req.body.status;
      task.programmer = req.body.programmer;
      task.task = req.body.task;
      task.endtime = req.body.endtime;
      task.starttime = req.body.starttime;
      task
        .save()
        .then((task) => {
          res.status(200).send(task);
        })
        .catch((err) => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
taskRoutes.route("/delete/:id").get(function (req, res) {
  Task.findByIdAndRemove({ _id: req.params.id }, function (err, task) {
    if (err) res.json(err);
    else res.status(200).json("Successfully removed");
  });
});
// Defined get data(index or listing) route

taskRoutes.route("/history/:title").get(function (req, res) {
  Task.find({ date: req.params.title }, function (err, tasks) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(tasks);
    }
  });
});

taskRoutes.route("/projects").get(function (req, res) {
  Task.distinct("project", function (err, projects) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(projects);
    }
  });
});

taskRoutes.route("/filter/").get(function (req, res) {
  let programmer = req.query.programmer;
  let project = req.query.project;
  let sdate = req.query.startdate;
  let edate = req.query.enddate;

  Task.find(
    {
      $and: [
        { project: { $regex: project, $options: "i" } },
        { programmer: { $regex: programmer, $options: "i" } },
        {
          date: {
            $gte: sdate,
            $lte: edate,
          },
        },
      ],
    },
    function (err, tasks) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(tasks);
      }
    }
  );
});

module.exports = taskRoutes;
