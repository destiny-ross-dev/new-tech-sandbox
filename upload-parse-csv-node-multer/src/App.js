import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { Link } from "react-router-dom";

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
  const [fileList, setFileList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5200/view");

      setFileList(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-container">
          <div className="import-container">
            <h2>Upload:</h2>
            <p className="csv-name">{selectedFile.name || "Select a file"}</p>
            <input
              onChange={onChangeHandler}
              type="file"
              name="csv"
              id="upload-csv"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            <label for="upload-csv">Browse</label>
            <button onClick={onClickHandler}>Upload</button>
          </div>
          <div className="view-container">
            <h2>View</h2>
            {(fileList &&
              fileList.map(e => {
                return <Link to={`/file/${e.slice(0, -4)}`}>{e}</Link>;
              })) ||
              "No files. Upload a csv to view data!"}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
