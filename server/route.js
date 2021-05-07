//global modules
const express = require('express');

//rest code...
const router = express.Router();

router.get('/todos', (req, res) => {
  const todos = require('./data/todos.json');
  res.json(todos);
});

router.post('/todos', (req, res) => {
    //add todo to todos.json
    res.status(201).end()
  });

  router.put('/todos/:id', (req, res) => {
    //update todo isDone value for a specific todo item (id: req.params.id)
    res.status(201).end()
  });


  router.delete('/todos/:id', (req, res) => {
    //remove todo item (id: req.params.id)
    res.status(201).end()
  });

  router.delete('/todos', (req, res) => {
    //clear todos.json
    res.status(201).end()
  });
module.exports = router;