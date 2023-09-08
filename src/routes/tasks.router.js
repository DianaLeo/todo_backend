const { Router } = require('express');
require('../models/database');
const {
    getAllTasks,
    updateTaskById,
    createTask,
    deleteTaskById
} = require('../controllers/tasks.controllers');

const tasksRouter = Router();

//get all tasks
//http://localhost/api/tasks
tasksRouter.get('/tasks',getAllTasks);

//update a task by id
//http://localhost/api/tasks/64fac5c0b5fae705ee99d966
tasksRouter.put('/tasks/:id',updateTaskById);

//post a new task
//http://localhost/api/tasks
//data input: req.body
tasksRouter.post('/tasks', createTask);

//delete a task
//http://localhost/api/tasks/64fac5c0b5fae705ee99d966
tasksRouter.delete('/tasks/:id', deleteTaskById);


module.exports = tasksRouter;