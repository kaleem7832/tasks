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
      task.enddate = req.body.enddate;
      task.startdate = req.body.startdate;
      task
        .save()
        .then((task) => {
          Project.updateOne(
            { last: task._id },
            {
              task: task.task,
              programmer: task.programmer,
              status: task.status,
            },
            function (err, numberAffected, rawResponse) {}
          );
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
  let id = req.params.id;

  Task.findById(id, function (err, b) {
    Task.find({ project: b.project }, function (e, t) {
      if (t.length > 1) {
        Task.findByIdAndRemove(
          { _id: req.params.id },
          { useFindAndModify: false },
          function (err, task) {
            if (err) res.json(err);
            else res.json("Successfully removed");
          }
        );
        Project.find({ last: req.params.id }, function (err, project) {
          if (err) {
            console.log(err);
          } else {
            if (project.length) {
              Task.findOne(
                { project: project[0].project },
                {},
                { sort: { _id: -1 } },
                function (err, task) {
                  console.log("old :" + task);
                  Project.updateOne(
                    { _id: project[0]._id },
                    {
                      task: task.task,
                      programmer: task.programmer,
                      status: task.status,
                      last: task._id,
                    },
                    function (err, numberAffected, rawResponse) {}
                  );
                }
              ).then(console.log("you just deleted the latest one 2"));
            }
          }
        });
      } else {
        res.status(200).send("You can not delete the last task");
      }
    });
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

module.exports = taskRoutes;
