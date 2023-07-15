import React, { useState } from "react";
import GetReport from "./getReport";
import axios from "axios";
import "./testResultsForm.css";

function TestResultsForm() {
  const [testResult, setTestResult] = useState({
    totalCholestrol: "",
    hdlCholestrol: "",
    vldl: "",
    ldlCholestrol: "",
    triglycerides: "",
  });

  const [url, setUrl] = useState("");

  const handleChange = (e) => {
    setTestResult({ ...testResult, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/test-results", testResult)
      .then((response) => {
        console.log(response);
        let url = response.data.reportUrl;
        setUrl(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(url);

  return (
    <div>
      <h1>Enter Test Results</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          name="totalCholestrol"
          value={testResult.totalCholestrol}
          onChange={handleChange}
          placeholder="Enter Total Cholestrol value"
        />

        <input
          className="input-field"
          type="text"
          name="hdlCholestrol"
          value={testResult.hdlCholestrol}
          onChange={handleChange}
          placeholder="Enter Hdl Cholestrol value"
        />

        <input
          className="input-field"
          type="text"
          name="vldl"
          value={testResult.vldl}
          onChange={handleChange}
          placeholder="Enter VLDL value"
        />

        <input
          className="input-field"
          type="value"
          name="ldlCholestrol"
          value={testResult.ldlCholestrol}
          onChange={handleChange}
          placeholder="Enter LDL Cholestrol value"
        />

        <input
          className="input-field"
          type="text"
          name="triglycerides"
          value={testResult.triglycerides}
          onChange={handleChange}
          placeholder="Enter tryglycerides value"
        />

        <button className="click-button" type="submit">
          Generate Report
        </button>
      </form>
      <GetReport url={url} />
    </div>
  );
}

export default TestResultsForm;
