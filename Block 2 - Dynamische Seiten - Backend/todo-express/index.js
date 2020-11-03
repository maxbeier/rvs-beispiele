const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* TODOs verwalten
- C: POST
- R: GET
- U: PATCH
- D: DELETE
 */

let todos = [
  {id: 'a', title: 'eins' , isDone: true },
  {id: 'b', title: 'zwei' , isDone: false },
  {id: 'c', title: 'drei' , isDone: false },
];

app.get('/todos', (req, res) => {
  res.send({ sucess: true, data: todos });
});

app.post('/todos', (req, res) => {
  const todo = req.body;
  todos.push(todo);
  res.send({ sucess: true, data: todo });
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex(todo => todo.id === id);
  todos[index] = { ...todos[index], ...req.body };
  res.send({ sucess: true, data: todos[index] });
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  todos = todos.filter(todo => todo.id !== id);
  res.send({ sucess: true });
});

app.listen(3000, () => {
  console.log('Listening on port 3000.');
});
