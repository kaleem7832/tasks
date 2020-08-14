const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./DB.js");
const projectsRoutes = require("./projects.routes");
const taskRoutes = require("./taskroutes");
// var schedule = require("node-schedule");
// let Task = require("./taskhistory");

// var nodemailer = require("nodemailer");

require("dotenv").config();

// ... other imports
const path = require("path");

// ... other app.use middleware
app.use(express.static(path.join(__dirname, "client", "build")));

// ...

mongoose.Promise = global.Promise;
mongoose
  .connect(config.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      console.log("Database is connected");
    },
    (err) => {
      console.log("Can not connect to the database" + err);
    }
  );
if (process.env.NODE_ENV === "production") {
  app.use(express.static("/build"));
}
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/projects", projectsRoutes);
app.use("/tasks", taskRoutes);

// var j = schedule.scheduleJob("45 20 * * *", function () {
//   Task.find({ status: "in-process" }, function (err, tasks) {
//     if (err) {
//       //res.status(400).send(err);
//     } else {
//       //res.status(200).send(tasks);
//       var message = "<h1>No Incomplete tasks!</h1>";
//       if (tasks.length > 0) {
//         message =
//           "<h2>Incomplete Task(s) :" +
//           tasks.length +
//           "</h2><table style='border-collapse:collapse'><tr style='background:lightblue'><th style='border:1px solid;padding:10px'>Date</th><th style='border:1px solid;padding:10px'>Project</th><th style='border:1px solid;padding:10px'>Task</th><th style='border:1px solid;padding:10px'>Programmer</th><th style='border:1px solid;padding:10px'>Status</th></tr><tr>";
//         tasks.map((task) => {
//           message +=
//             "<td style='border:1px solid;padding:10px;text-align:center'>" +
//             task.date +
//             "</td><td style='border:1px solid;padding:10px;text-align:center'>" +
//             task.project +
//             "</td><td style='border:1px solid;padding:10px;text-align:center'>" +
//             task.task +
//             "</td><td style='border:1px solid;padding:10px;text-align:center'>" +
//             task.programmer +
//             "</td><td style='border:1px solid;padding:10px;text-align:center'>" +
//             task.status +
//             "</td><td></tr>";
//         });
//         message += "</table>";
//       }
//       var transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: "kaleem.nalband@gmail.com",
//           pass: "********",
//         },
//       });

//       var mailOptions = {
//         from: "kaleem.nalband@gmail.com",
//         to: "kaleem.nalband@iresearchservices.com",
//         subject: "Incomplete Tasks Reminder",
//         html: message,
//       };

//       transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log("Email sent: " + info.response);
//         }
//       });
//     }
//   });
// });
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(PORT, function () {
  console.log("Server is running on Port:", PORT);
});
