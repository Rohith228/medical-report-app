import React, { useEffect, useState } from "react";
import "./getReport.css";

const GetReport = ({ url }) => {
  const [totalCholestrol, setTotalCholestrol] = useState("");
  const [hdlCholestrol, sethdlCholestrol] = useState("");
  const [vldl, setVldl] = useState("");
  const [ldlCholestrol, setldlCholestrol] = useState("");
  const [triglycerides, settriglycerides] = useState("");

  const getDetails = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setTotalCholestrol(data.totalCholestrol);
    sethdlCholestrol(data.hdlCholestrol);
    setVldl(data.vldl);
    setldlCholestrol(data.ldlCholestrol);
    settriglycerides(data.triglycerides);
  };

  useEffect(() => {
    getDetails();
  });

  let totalCholestrolStatus = "";
  if (totalCholestrol <= 50) {
    totalCholestrolStatus = "Low";
  } else if (totalCholestrol > 50 && totalCholestrol < 200) {
    totalCholestrolStatus = "Normal";
  } else {
    totalCholestrolStatus = "High";
  }

  let ldlCholestrolStatus = "";
  if (ldlCholestrol <= 100) {
    ldlCholestrolStatus = "Normal";
  } else {
    ldlCholestrolStatus = "High";
  }

  let hdlCholestrolStatus = "";
  if (hdlCholestrol <= 40) {
    hdlCholestrolStatus = "Low";
  } else if (totalCholestrol > 40 && totalCholestrol < 60) {
    hdlCholestrolStatus = "Normal";
  } else {
    hdlCholestrolStatus = "High";
  }

  let vldlStatus = "";
  if (vldl <= 2) {
    vldlStatus = "Low";
  } else if (vldl > 2 && vldl < 30) {
    vldlStatus = "Normal";
  } else {
    vldlStatus = "High";
  }

  let triglyceridesStatus = "";
  if (triglycerides <= 50) {
    triglyceridesStatus = "Low";
  } else if (triglycerides > 50 && triglycerides < 150) {
    triglyceridesStatus = "Normal";
  } else {
    triglyceridesStatus = "High";
  }

  if (
    totalCholestrol &&
    hdlCholestrol &&
    vldl &&
    ldlCholestrol &&
    triglycerides
  ) {
    return (
      <div className="report-container">
        <p>
          1. Total Cholestrol: {totalCholestrol} mg/dl ---- (
          {totalCholestrolStatus})
        </p>
        <p>
          2. HDL Cholesrol {hdlCholestrol} mg/dl---- ({hdlCholestrolStatus})
        </p>
        <p>
          3. VLDL {vldl}mg/dl ---- ({vldlStatus})
        </p>
        <p>
          4. LDL Cholestrol {ldlCholestrol}mg/dl ---- ({ldlCholestrolStatus})
        </p>
        <p>
          5. Triglycerides {triglycerides}mg/dl ---- ({triglyceridesStatus})
        </p>
      </div>
    );
  }
};

export default GetReport;
