import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import "./FileView.css";
const JsonTable = require("ts-react-json-table");

function FileView(props) {
  const match = props.match.params.id;

  const [fileData, setFileData] = useState();
  const [headerData, setHeaderData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:5200/files/${match}`);
      setHeaderData(result.data.fields);
      setFileData(result.data.rows);
    };

    fetchData();
  }, []);

  return (
    <header className="App-header">
      <Link to="/">
        <img src={logo} className="App-logo" alt="logo" />
      </Link>
      <h2>{match}.csv</h2>
      <JsonTable rows={fileData} />
    </header>
  );
}

export default FileView;
