import React from "react";
import logo from "./logo.svg";
import "antd/dist/antd.css";
import "./App.css";
import DatePickerContainer from "./components/DatePickerContainer/DatePickerContainer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DatePickerContainer />
      </header>
    </div>
  );
}

export default App;
