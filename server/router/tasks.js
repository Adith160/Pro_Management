const express = require('express');
const router = express.Router();
const verifyAuth = require('../middlewares/jwtMiddleware');
const { taskController } = require('../controller/taskController');

// Routes for task operations
router.post('/create', verifyAuth, taskController.createTask);
router.delete('/delete/:task_id', verifyAuth, taskController.deleteTask);
router.put('/edit/:task_id', verifyAuth, taskController.editTask);
router.put('/updateTaskStatus/:taskId/:status', verifyAuth, taskController.updateTaskStatus);
router.get('/getTaskById/:taskId?', verifyAuth, taskController.getTaskById);
router.get('/getAllTasksByWeek/:period/:status', verifyAuth, taskController.getAllTasksByWeek);
router.get('/taskSummary', verifyAuth, taskController.getTaskStatistics );
router.get('/getTaskByStatus/:status?', verifyAuth, taskController.getTaskByStatus);

module.exports = router;
