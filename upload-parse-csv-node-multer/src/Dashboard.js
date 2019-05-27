import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(0);

  const onChangeHandler = event => {
    setSelectedFile(event.target.files[0]);
  };

  const onUploadHandler = () => {
    const data = new FormData();
    data.append("file", selectedFile);
    axios.post("http://localhost:5200/upload", data, {}).then(res => {
      axios("http://localhost:5200/files").then(result =>
        setFileList(result.data)
      );
    });
  };

  const [fileList, setFileList] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5200/files");
      setFileList(result.data);
    };

    fetchData();
  }, []);

  return (
    <header className="App-header">
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
          <label htmlFor="upload-csv">Browse</label>
          <button onClick={onUploadHandler}>Upload</button>
        </div>
        <div className="view-container">
          <h2>View</h2>
          {(fileList &&
            fileList.map((e, i) => {
              return (
                <Link
                  className="App-link"
                  key={i}
                  to={`/file/${e.slice(0, -4)}`}
                >
                  {e}
                </Link>
              );
            })) ||
            "No files. Upload a csv to view data!"}
        </div>
      </div>
    </header>
  );
}

export default Dashboard;
