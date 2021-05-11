//global modules
const express = require("express");

////////////////////////
const fs = require("fs");
////////////////////////

//rest code...
const router = express.Router();

////////////////////////////////////////////////////////////
// Create readTodos function to read and parse
const readTodos = () => {
  const data = fs.readFileSync("./data/todos.json"); // Read file and put it to data
  const todos = JSON.parse(data); // Transform data and put it to todos
  return todos; // Return todos from a server to a client
};
////////////////////////////////////////////////////////////

// Request for todos
router.get("/todos", (req, res) => {
  let todos = readTodos(); // Read file and put it to todos
  res.json(todos); // Send todos as a response from a server to a client
});

// Send some info to a server
router.post("/todos", (req, res) => {
  let { todos } = readTodos(); // Read file and put it to todos

  const todo = {
    id: todos[todos.length - 1].id + 1, // Take the id of the last element of array and increase it + 1
    name: req.body.name,
    isDone: req.body._isDone,
  };

  todos.push(todo);

  fs.writeFileSync("./data/todos.json", JSON.stringify({ todos }));

  res.json(todo);
});

router.put("/todos/:id", (req, res) => {
  //update todo isDone value for a specific todo item (id: req.params.id)
  res.status(201).end();
});

router.delete("/todos/:id", (req, res) => {
  //remove todo item (id: req.params.id)
  res.status(201).end();
});

router.delete("/todos", (req, res) => {
  //clear todos.json
  res.status(201).end();
});
module.exports = router;
