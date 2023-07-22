const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

let getData = () => {
  return JSON.parse(fs.readFileSync("./questions.json", "utf8"));
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
  console.log(dataQuestion);
  res.send(dataQuestion);
});

app.get("/*", (req, res) => {
  res.send("page not found");
});

app.listen(port, () => {
  console.log("server is running ", port);
});
