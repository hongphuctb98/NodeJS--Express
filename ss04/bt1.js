const express = require("express");
const app = express();
const port = 3030;
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/overview", (req, res) => {
  res.send("overview page");
});
app.get("/product", (req, res) => {
  res.send("product page");
});

app.get("/api/v1/users", (req, res) => {
  fs.readFile("./users.json", (err, data) => {
    if (err) return err;

    res.send(JSON.parse(data));
  });
});
app.get("/api/v1/users/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile("./users.json", (err, data) => {
    if (err) return err;
    const users = JSON.parse(data);
    const resultUser = users.find((user) => user._id == id);
    res.send(resultUser);
  });
});

app.post("/api/v1/users", (req, res) => {
  const inputForm = req.body;

  fs.readFile("./users.json", (err, data) => {
    if (err) return err;
    let users = JSON.parse(data);
    users.some((user) => user.email == inputForm.email)
      ? res.status(404).json("exits")
      : users.push(inputForm);

    console.log(users);
    fs.writeFileSync("./users.json", JSON.stringify(users));
    res.status(200).json({ message: "success", content: inputForm });
  });
});

app.put("/api/v1/users/:id", (req, res) => {
  const id = req.params.id;
  const newUser = req.body;

  fs.readFile("./users.json", (err, data) => {
    if (err) return err;
    const users = JSON.parse(data);
    const resultUser = users.findIndex((user) => user._id == id);

    if (resultUser == -1) {
      res.status(404).json("not found");
    } else {
      users[resultUser] = { ...users[resultUser], ...newUser };
      fs.writeFileSync("./users.json", JSON.stringify(users));
      res.status(200).json("success updated");
    }
  });
});

app.get("/*", (req, res) => {
  res.send(" page not found");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
