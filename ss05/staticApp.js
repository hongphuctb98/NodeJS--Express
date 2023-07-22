const express = require("express");
const app = express();
const fs = require("fs");
const port = 3010;

const path = require("path");
app.use("/static", express.static(path.join(__dirname, "public")));
let getData = () => {
  return JSON.parse(fs.readFileSync("./questions.json", "utf8"));
};

let getIndexHtml = () => {
  return fs.readFileSync("./public/index.html", "utf8");
};
let getDetailHtml = () => {
  return fs.readFileSync("./public/question-detail.html", "utf8");
};

app.get("/", (req, res) => {
  res.send("hello word");
});

app.get("/ask", (req, res) => {
  res.send("ask page");
});

app.get("/question-detail/:id", (req, res) => {
  res.send("question detail page");
});

app.get("/api/v1/questions", (req, res) => {
  const dataQuestion = getData();
  const rdn = Math.floor(Math.random() * dataQuestion.length);
  const questionContent = dataQuestion[rdn].content;
  let indexHtml = getIndexHtml();
  console.log(questionContent);
  indexHtml = indexHtml.replace(
    `<div class="question-content">Some questions????</div>`,
    `<div class="question-content">${questionContent}</div>`
  );
  res.send(indexHtml);
});

app.get("/api/v1/questions/:id", (req, res) => {
  const dataQuestion = getData();
  const rdn = Math.floor(Math.random() * dataQuestion.length);
  const questionContent = dataQuestion[rdn].content;
  let detailHtml = getDetailHtml();
  const idDetil = req.params.id;
  console.log(idDetil);
  res.send(detailHtml);
});
// app.get("/test", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/index.html"));
// });

app.get("/*", (req, res) => {
  res.send("page not found");
});

app.listen(port, () => {
  console.log("server is running ", port);
});
