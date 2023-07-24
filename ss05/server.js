const express = require("express");
const fs = require("fs");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

const user = {
  userName: "chihuahua",
  password: "123",
};
const middleWareCheckLogin = (req, res, next) => {
  if (user.userName === "chihuahua" && user.password === "123456") {
    res.send("login success");
    next();
  } else {
    res.send("login error");
    res.redirect("/login");
  }
};

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/payment", middleWareCheckLogin, (req, res) => {
  res.send("payment page");
});

app.get("/login", (req, res) => {
  res.send("login page");
});

app.listen(port, () => {
  console.log("server is running ", port);
});
