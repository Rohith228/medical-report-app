const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const port = 5000; // Update with your desired port

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/test-results", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Test Result Model
const TestResult = mongoose.model("TestResult", {
  totalCholestrol: Number,
  hdlCholestrol: Number,
  vldl: Number,
  ldlCholestrol: Number,
  triglycerides: Number,
});

// Report Model
const Report = mongoose.model("Report", {
  totalCholestrol: Number,
  hdlCholestrol: Number,
  vldl: Number,
  ldlCholestrol: Number,
  triglycerides: Number,
  reportUrl: String,
  testResultId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestResult",
  },
});

// API Endpoints
app.post("/api/test-results", (req, res) => {
  const { totalCholestrol, hdlCholestrol, vldl, ldlCholestrol, triglycerides } =
    req.body;

  const newTestResult = new Report({
    totalCholestrol,
    hdlCholestrol,
    vldl,
    ldlCholestrol,
    triglycerides,
  });

  newTestResult
    .save()
    .then((savedTestResult) => {
      // Generate the report URL here
      const reportUrl = `http://localhost:5000/api/reports/${savedTestResult._id}`;
      console.log(reportUrl);

      const newReport = new Report({
        totalCholestrol,
        hdlCholestrol,
        vldl,
        ldlCholestrol,
        triglycerides,
        reportUrl,
        testResultId: savedTestResult._id, // Associate the TestResult ID with the Report document
      });

      newReport
        .save()
        .then(() => {
          res.json({ reportUrl }); // Send the report URL as JSON response
        })
        .catch((error) => {
          res.status(500).send("Error saving report");
        });
    })
    .catch((error) => {
      res.status(500).send("Error saving test result");
    });
});

app.get("/api/reports/:id", async (req, res) => {
  const reportId = req.params.id;

  const report = await Report.findById(reportId);
  console.log(report);
  res.json(report);
  //   console.log(report);
});

app.get("/api/reports", async (req, res) => {
  const out = await Report.find({});
  res.json(out);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
