const express = require('express');
const router = express.Router();
const verifyAuth = require('../middlewares/jwtMiddleware');
const { taskController } = require('../controller/taskController');

// Routes for task operations
router.post('/create', verifyAuth, taskController.createTask);
router.put('/edit/:task_id', verifyAuth, taskController.editTask);
router.put('/updateTaskStatus/:taskId/:status', verifyAuth, taskController.updateTaskStatus);
router.put('/updateChecklistType/:taskId/:index/:type', verifyAuth, taskController.updateChecklistType);
router.delete('/delete/:task_id', verifyAuth, taskController.deleteTask);
router.get('/getTaskById/:taskId?', verifyAuth, taskController.getTaskById);
router.get('/getPublicTaskById/:taskId?', taskController.getPublicTaskById);
router.get('/getTaskByStatus/:status?', verifyAuth, taskController.getTaskByStatus);
router.get('/getAllTasksByWeek/:period/:status', verifyAuth, taskController.getAllTasksByWeek);
router.get('/getPublicTasks/:period/:status', taskController.getSharedTasks);
router.get('/taskSummary', verifyAuth, taskController.getTaskStatistics );

module.exports = router;
