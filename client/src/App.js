import React, { Component } from "react";
import Calendar from "./components/Calendar";
import DataView from "./components/dataView";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      cdate: "",
    };
  }
  componentDidMount() {
    let today = moment().format("DD-MM-YYYY");
    this.setState({ cdate: today });
  }
  dateSelected = (date) => {
    console.log(date);
    this.setState({ cdate: date });
  };
  render() {
    return (
      <div className="container">
        <h2 className="text-primary">Task Tracker app</h2>
        <Calendar onDateSelect={this.dateSelected} cdate={this.state.cdate} />
        <DataView title={this.state.cdate} />
      </div>
    );
  }
}

export default App;
