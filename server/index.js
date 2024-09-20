const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize('postgres://postgres: @localhost:5432/todolist');

const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

app.get('/todos', async (req, res) => {
  const todos = await Todo.findAll();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const { title } = req.body;
  const todo = await Todo.create({ title });
  res.json(todo);
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = await Todo.findByPk(id);
  if (todo) {
    todo.title = title;
    todo.completed = completed;
    await todo.save();
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByPk(id);
  if (todo) {
    await todo.destroy();
    res.json({ message: 'Todo deleted' });
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.listen(3001, async () => {
  console.log('Server is running on http://localhost:3001');
  await sequelize.sync();
});
