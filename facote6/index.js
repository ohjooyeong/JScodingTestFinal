const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

app.get("/question", (req, res) => {
  res.sendFile(path.join(__dirname, "src/components/question.html"));
});

app.get("/result/[1-5]", (req, res) => {
  res.sendFile(path.join(__dirname, "src/components/result.html"));
});

app.listen(8080, () => {
  console.log("Server Running On: 8080");
});
