const express = require('express');
const router = express.Router();
const verifyAuth = require('../middlewares/jwtMiddleware');
const { taskController } = require('../controller/taskController');

// Routes for task operations
router.post('/create', verifyAuth, taskController.createTask);
router.delete('/delete/:task_id', verifyAuth, taskController.deleteTask);
router.put('/edit/:task_id', verifyAuth, taskController.editTask);
router.get('/getAllTask/:taskId?', verifyAuth, taskController.getAllTasks);
router.get('/tasksByWeek/:week', verifyAuth, taskController.getTasksByWeek);

module.exports = router;
