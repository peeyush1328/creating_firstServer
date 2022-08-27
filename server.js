const express = require("express");
const port = 8080;
const app = express();
const todolist = ["cricket", "football", "baseball"];
app.use(express.json());

app.get("/list", (req, res) => {
  res.status(200).send(todolist);
});
app.post("/list", (req, res) => {
  let newtodo = req.body.item;
  todolist.push(newtodo);
  res.status(200).send({
    message: "task added successfully",
  });
});
app.delete("/list", (req, res) => {
  let deletethis = req.body.item;
  todolist.find((element, index) => {
    if (element === deletethis) {
      todolist.splice(index, 1);
    }
  });
  res.status(200).send({
    message: "task deleted succesfully",
  });
});
app.all("/list", (req, res) => {
  res.status(501).send();
});
app.all("*", (req, res) => {
  res.status(404).send();
});
app.listen(port, () => {
  console.log(`node.js server started :${port}`);
});
