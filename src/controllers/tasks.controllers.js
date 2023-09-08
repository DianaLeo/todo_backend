const Todo = require('../models/model');

const getAllTasks = async (req, res) => {
    console.log("Get All tasks");
    const { title, completed } = req.query;
    if (title) {
        console.log("Trying await Todo.find(title)");
        try {
            const tasks = await Todo.find({ title: title });
            res.json(tasks);
            return;
        } catch (error) {
            res.status(500).json({
                msg: "Something went wrong when retrieving todo tasks by title."
            })
            return;
        }
    }
    if (completed) {
        try {
            const tasks = await Todo.find({ completed: completed });
            res.json(tasks);
            return;
        } catch (error) {
            res.status(500).json({
                msg: "Something went wrong when retrieving todo tasks by completed."
            })
            return;
        }
    }
    try {
        console.log("Trying await Todo.find()");
        const tasks = await Todo.find();
        console.log("Tasks:",tasks);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            msg: "Something went wrong when retrieving todo tasks."
        })
    }
}


const updateTaskById = async (req, res) => {
    const id = req.params.id;
    const { title, description, completed } = req.body;
    let task = {};
    if (title !== undefined) {
        //type check
        if (typeof (title) !== 'string') {
            res.status(400).json({
                statusCode: 400,
                msg: `Sorry, invalid input type`
            })
            return;
        }
        try {
            task = await Todo.findOneAndUpdate(
                { _id: id },
                { $set: { title: title, } },
                { new: true }
            );
        } catch (error) {
            res.status(500).json({
                msg: error.message || "Something went wrong when updating a list."
            })
            return;
        }
    }
    if (description !== undefined) {
        //type check
        if (typeof (description) !== 'string') {
            res.status(400).json({
                statusCode: 400,
                msg: `Sorry, invalid input type`
            })
            return;
        }
        try {
            task = await Todo.findOneAndUpdate(
                { _id: id },
                { $set: { description: description, } },
                { new: true }
            );
        } catch (error) {
            res.status(500).json({
                msg: error.message || "Something went wrong when updating a list."
            })
            return;
        }
    }
    if (completed !== undefined) {
        //type check, boolean
        if (typeof (completed) !== 'boolean') {
            res.status(400).json({
                statusCode: 400,
                msg: `Sorry, invalid input type`
            })
            return;
        }
        try {
            task = await Todo.findOneAndUpdate(
                { _id: id },
                { $set: { completed: completed, } },
                { new: true }
            );
        } catch (error) {
            res.status(500).json({
                msg: error.message || "Something went wrong when updating a list."
            })
            return;
        }
    }
    if (!task) {
        res.status(404).json({
            msg: `Something went wrong when updating a list.`
        })
        return;
    }

    res.json(task);
}


const createTask = (req, res) => {
    const { title, description } = req.body;
    //data validation
    if (title === undefined) {
        res.status(404).json({
            statusCode: 404,
            msg: `Sorry, invalid input type`
        })
        return;
    }
    const todo = new Todo({
        title: title,
        description: description,
    })
    todo.save(todo)
        .then(data => {
            console.log(data);
            res.json(data);
        }).catch(error => {
            res.status(500).json({
                msg: error.message || "Something went wrong when creating a new todo list."
            })
        })
}


const deleteTaskById = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Todo.deleteOne({_id:id});
        res.json(task);
    } catch (error) {
        res.status(500).json({
            msg: `Sorry, something went wrong when deleting a task.`
        })
    }
}


module.exports = {
    getAllTasks,
    updateTaskById,
    createTask,
    deleteTaskById
}