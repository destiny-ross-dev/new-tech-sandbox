import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <label for="upload-csv">Import CSV</label>
        <input
          type="file"
          name="csv"
          id="upload-csv"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
      </header>
    </div>
  );
}

export default App;
