import React, { useState } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(0);

  const onChangeHandler = event => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const onClickHandler = () => {
    const data = new FormData();
    data.append("file", selectedFile);
    axios
      .post("http://localhost:5200/upload", data, {
        // receive two    parameter endpoint url ,form data
      })
      .then(res => {
        // then print response status
        console.log(res.statusText);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="import-container">
          <p className="csv-name">{selectedFile.name || "Select a file"}</p>
          <input
            onChange={onChangeHandler}
            type="file"
            name="csv"
            id="upload-csv"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
          <label for="upload-csv">Browse</label>
        </div>
        <button onClick={onClickHandler}>Upload</button>
      </header>
    </div>
  );
}

export default App;
