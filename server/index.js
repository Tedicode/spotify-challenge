const path = require("path");
const express = require("express");
const app = express();
const PORT = 8000;

// body parsing middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", require("./api"));

// serve up homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
  // IF ERROR TRY THIS
  // res.sendFile('../public/index.html')
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
