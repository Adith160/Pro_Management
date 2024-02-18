const Task = require('../models/taskModel');
const taskValidation = require('../validations/taskValidation');
const moment = require('moment');

exports.taskController = {
    // Create a new task
    createTask: async (req, res) => {
        try {
            const taskValidationRes = taskValidation.validate(req.body);
            if (taskValidationRes.error) {
                return res.status(400).json({ error: taskValidationRes.error.message, success: false });
            }
            const newTask = new Task(req.body);
            await newTask.save();

            res.status(201).json({ message: "Task Saved Successfully", success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error', success: false });
        }
    },

    //Router for edit task
    editTask : async (req, res) => {
        try {
            const taskValidationRes = taskValidation.validate(req.body);
            if (taskValidationRes.error) {
                return res.status(400).json({ error: taskValidationRes.error.message, success: false });
            }
            const taskId = req.params.task_id;
            if (!taskId) {
                return res.status(409).json({ message: "Parameter missing", success: false });
            }
            const newTask = req.body;
            const updateStatus = await Task.updateOne({ _id: taskId }, { $set: newTask });
            if (!updateStatus) {
                return res.status(409).json({ message: "Job Id Not Found", success: false });
            }
    
            res.status(201).json({ message: "Task Saved Successfully", success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error', success: false });
        }
    },

    // Delete a task
    deleteTask: async (req, res) => {
        try {
            const taskId = req.params.task_id;
            if (!taskId) {
                return res.status(409).json({ message: "Parameter missing", success: false });
            }

            const deleteResult = await Task.findByIdAndDelete(taskId);
            if (!deleteResult) {
                return res.status(401).json({ message: "Task Not Found", success: false });
            }

            res.status(201).json({ message: "Task Deleted Successfully", success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error', success: false });
        }
    },

    // Get all tasks or a specific task by ID
    getAllTasks: async (req, res) => {
        try {
            if (req.params.taskId) {
                const taskId = req.params.taskId;
                const task = await Task.findById(taskId);
                if (!task) {
                    return res.status(404).json({ message: "Task not found", success: false });
                }
                res.status(200).json({ task, success: true });
            } else {
                const tasks = await Task.find();
                res.status(200).json({ tasks, success: true });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error', success: false });
        }
    },

    // Get tasks by week
    getTasksByWeek: async (req, res) => {
        try {
            const { week } = req.params;
            let startOfWeek, endOfWeek;

            const today = moment().startOf('day');
            const startOfCurrentWeek = moment().startOf('week');
            const endOfCurrentWeek = moment().endOf('week');

            if (week === 'this') {
                startOfWeek = startOfCurrentWeek;
                endOfWeek = endOfCurrentWeek;
            } else if (week === 'prev') {
                startOfWeek = moment().subtract(1, 'week').startOf('week');
                endOfWeek = moment().subtract(1, 'week').endOf('week');
            } else if (week === 'next') {
                startOfWeek = moment().add(1, 'week').startOf('week');
                endOfWeek = moment().add(1, 'week').endOf('week');
            } else {
                return res.status(400).json({ error: 'Invalid week parameter', success: false });
            }

            startOfWeek.utc();
            endOfWeek.utc();

            const tasks = await Task.find({
                dueDate: {
                    $gte: startOfWeek.toDate(),
                    $lte: endOfWeek.toDate()
                }
            });

            res.status(200).json({ tasks, success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error', success: false });
        }
    }
};
