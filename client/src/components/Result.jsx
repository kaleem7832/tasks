import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }
  componentWillReceiveProps(props) {
    // properties changed
    console.log("search filter", props.search.programmer);
    axios
      .get("/tasks/filter/", {
        params: {
          programmer: props.search.programmer,
          project: props.search.project,
          startdate: props.search.startdate,
          enddate: props.search.enddate,
        },
      })
      .then((response) => {
        this.setState({ tasks: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Project</th>
            <th>Programmer</th>
            <th>Task</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.state.tasks.map((task) => (
            <tr>
              <td>{task.date}</td>
              <td>{task.project}</td>
              <td>{task.programmer}</td>
              <td>{task.task}</td>
              <td>{moment(task.starttime).format("LT")}</td>
              <td>{moment(task.endttime).format("LT")}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default Result;
