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

app.post("/submit", (req, res) => {
  const data = req.body;
  let numberArr = [0, 0, 0, 0, 0];

  for (let i = 1; i < 11; i++) {
    let developerNum = Number(data[`question-${i}`]);
    numberArr[developerNum - 1] += 1;
  }

  let maxValue = 0;
  let maxValueIdx = 0;

  for (let i = 0; i < numberArr.length; i++) {
    if (numberArr[i] > maxValue) {
      maxValue = numberArr[i];
      maxValueIdx = i;
    }
  }

  res.redirect("/result/" + (maxValueIdx + 1));
});

app.listen(8080, () => {
  console.log("Server Running On: 8080");
});
