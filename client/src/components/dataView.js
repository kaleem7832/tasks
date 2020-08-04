import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import axios from "axios";
class DataView extends Component {
  constructor(props) {
    super(props);

    var columns = [
      {
        title: "Project",
        field: "project",
      },
      {
        title: "Programmer",
        field: "programmer",
        lookup: {
          Prachi: "Prachi",
          Ketan: "Ketan",
          Karishma: "Karishma",
          Kaleem: "Kaleem",
        },
      },
      {
        title: "Task",
        field: "task",
      },
      { title: "Start Time", field: "starttime", type: "time" },
      { title: "End Time", field: "endtime", type: "time" },
      {
        title: "Status",
        field: "status",
        lookup: {
          "in-process": "In Process",
          "on-hold": "On Hold",
          completed: "Completed",
        },
      },
    ];
    this.state = {
      tasks: [],
      columns: columns,
      cdate: this.props.title,
    };
  }

  componentWillReceiveProps(props) {
    // properties changed
    axios
      .get("/tasks/history/" + props.title)
      .then((response) => {
        this.setState({ tasks: response.data.reverse() });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div style={{ maxWidth: "100%" }}>
        <hr />
        <MaterialTable
          columns={this.state.columns}
          options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
          data={this.state.tasks}
          title={this.props.title}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                console.log("new data", newData);
                newData = { ...newData, date: this.props.title };

                axios.post("/tasks/add", newData).then((res) =>
                  axios
                    .get("/tasks/history/" + this.props.title)
                    .then((response) => {
                      this.setState({ tasks: response.data.reverse() });
                    })
                    .catch(function (error) {
                      console.log(error);
                    })
                );

                resolve();
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve) => {
                if (oldData) {
                  axios
                    .post("/tasks/update/" + oldData._id, newData)
                    .then((res) =>
                      axios
                        .get("/tasks/history/" + this.props.title)
                        .then((response) => {
                          this.setState({ tasks: response.data.reverse() });
                        })
                        .catch(function (error) {
                          console.log(error);
                        })
                    );
                  resolve();
                }
              }),
          }}
        />
      </div>
    );
  }
}

export default DataView;
