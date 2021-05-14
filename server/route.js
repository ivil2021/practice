//global modules
const express = require("express");

const fs = require("fs");

//rest code...
const router = express.Router();

// Create readTodos function to read and parse
const readTodos = () => {
  const data = fs.readFileSync("./data/todos.json"); // Read file and put it to data
  const todos = JSON.parse(data); // Transform data and put it to todos
  return todos; // Return todos from a server to a client
};

// Request for todos
router.get("/todos", (req, res) => {
  let todos = readTodos(); // Read a file and put it to the todos
  res.json(todos); // Send todos as a response from a server to a client
});

// Send some info to a server
router.post("/todos", (req, res) => {
  let { todos } = readTodos(); // Read a file and put it to the { todos } (key is todos and value is todos)

  const todo = {
    id: todos[todos.length - 1].id + 1, // Take the id of the last element of array and increase it + 1
    name: req.body.name,
    isDone: req.body._isDone,
  };

  todos.push(todo); // adding an element to the end of array

  fs.writeFileSync("./data/todos.json", JSON.stringify({ todos }));

  res.json(todo); // response from a server
});

router.put("/todos/:id", (req, res) => {
  //update todo isDone value for a specific todo item (id: req.params.id)
  let { todos } = readTodos(); // Read file and put it to { todos } (key is todos and value is todos)

  const found = todos.find((element) => element.id == req.params.id); // Search for the certain element by it's id
  // found -- the certain element element, that was founded by it's id

  found.isDone = !req.body._isDone; // changing isDone to the opposite value

  fs.writeFileSync("./data/todos.json", JSON.stringify({ todos }));

  res.status(201).end(); // adding an element to the end of array
});

router.delete("/todos/:id", (req, res) => {
  //remove todo item (id: req.params.id)
  let { todos } = readTodos(); // Read file and put it to { todos } (key is todos and value is todos)

  const found = todos.find((element) => element.id == req.params.id); // Search for the certain element by it's id
  // found --- the certain element element, that was founded by it's id

  let remainTodos = todos.filter((item) => item.id != found.id); // todos without the certain element

  fs.writeFileSync("./data/todos.json", JSON.stringify({ todos: remainTodos }));

  res.status(204).end(); // response from a server
});

router.delete("/todos", (req, res) => {
  //clear todos.json
  res.status(201).end();
});
module.exports = router;
