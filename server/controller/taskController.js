const Task = require("../models/taskModel");
const taskValidation = require("../validations/taskValidation");
const moment = require("moment");

exports.taskController = {
  // Create a new task
  createTask: async (req, res) => {
    try {
      const user = req.user.id;
      const request = { ...req.body, userRefId: user };
      const taskValidationRes = taskValidation.validate(request);
      if (taskValidationRes.error) {
        return res
          .status(400)
          .json({ error: taskValidationRes.error.message, success: false });
      }
      const newTask = new Task(request);
      await newTask.save();

      res
        .status(201)
        .json({ message: "Task Saved Successfully", success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", success: false });
    }
  },

  // edit task
  editTask: async (req, res) => {
    try {
      const user = req.user.id;
      const request = { ...req.body, userRefId: user };
      const taskValidationRes = taskValidation.validate(request);
      if (taskValidationRes.error) {
        return res
          .status(400)
          .json({ error: taskValidationRes.error.message, success: false });
      }
      const taskId = req.params.task_id;
      if (!taskId) {
        return res
          .status(409)
          .json({ message: "Parameter missing", success: false });
      }
      const newTask = request;
      const updateStatus = await Task.updateOne(
        { _id: taskId },
        { $set: newTask }
      );
      if (!updateStatus) {
        return res
          .status(409)
          .json({ message: "Job Id Not Found", success: false });
      }

      res
        .status(201)
        .json({ message: "Task Edited Successfully", success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", success: false });
    }
  },

  //update task status
  updateTaskStatus: async (req, res) => {
    try {
      const user = req.user.id;
      const status = req.params.status;
      const taskId = req.params.taskId;

      if (!status || !taskId) {
        return res
          .status(400)
          .json({ error: "Missing required parameters", success: false });
      }

      const updateStatus = await Task.updateOne(
        { _id: taskId, userRefId: user },
        { $set: { status: status } }
      );

      if (!updateStatus || updateStatus.nModified === 0) {
        return res
          .status(404)
          .json({ message: "Task not found or not updated", success: false });
      }

      res
        .status(200)
        .json({ message: "Task status updated successfully", success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", success: false });
    }
  },

  //update the checklist type
  updateChecklistType: async (req, res) => {
    try {
      const user = req.user.id;
      const { taskId, index, type } = req.params;

      if (!taskId || !index || !type) {
        return res
          .status(400)
          .json({ error: "Missing required parameters", success: false });
      }

      const task = await Task.findOne({ _id: taskId, userRefId: user });

      if (!task) {
        return res
          .status(404)
          .json({ message: "Task not found", success: false });
      }

      if (!task.checklists || !task.checklists[index]) {
        return res
          .status(404)
          .json({ message: "Checklist item not found", success: false });
      }

      // Update the type of the checklist item at the specified index
      task.checklists[index].type = type;

      // Mark the document as modified
      task.markModified("checklists");

      await task.save();

      res.status(200).json({
        message: "Checklist type updated successfully",
        success: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", success: false });
    }
  },
  // Delete a task
  deleteTask: async (req, res) => {
    try {
      const taskId = req.params.task_id;
      if (!taskId) {
        return res
          .status(409)
          .json({ message: "Parameter missing", success: false });
      }

      const deleteResult = await Task.findByIdAndDelete(taskId);
      if (!deleteResult) {
        return res
          .status(401)
          .json({ message: "Task Not Found", success: false });
      }

      res
        .status(201)
        .json({ message: "Task Deleted Successfully", success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", success: false });
    }
  },

  // Get task by ID
  getTaskById: async (req, res) => {
    try {
      if (req.params.taskId) {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);
        if (!task) {
          return res
            .status(404)
            .json({ message: "Task not found", success: false });
        }
        res.status(200).json({ task, success: true });
      } else {
        const tasks = await Task.find();
        res.status(200).json({ tasks, success: true });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", success: false });
    }
  },

  // Get task by ID
  getPublicTaskById: async (req, res) => {
    try {
      if (req.params.taskId) {
        const taskId = req.params.taskId;
        const task = await Task.findById(taskId);
        if (!task) {
          return res
            .status(404)
            .json({ message: "Task not found", success: false });
        }
        res.status(200).json({ task, success: true });
      } else {
        const tasks = await Task.find();
        res.status(200).json({ tasks, success: true });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", success: false });
    }
  },

  // Get tasks by status
  getTaskByStatus: async (req, res) => {
    try {
      if (req.params.status) {
        const status = req.params.status;
        const tasks = await Task.find({ status: status });
        if (!tasks || tasks.length === 0) {
          return res.status(404).json({
            message: "No tasks found with status: " + status,
            success: false,
          });
        }
        res.status(200).json({ tasks, success: true });
      } else {
        const tasks = await Task.find();
        res.status(200).json({ tasks, success: true });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", success: false });
    }
  },

  //get shared tasks
  getSharedTasks: async (req, res) => {
    try {
      const { period, status } = req.params;
      let query = { shared: 1 };
      query.status = status;

      // Add period conditions if provided
      let startDate, endDate;
      if (period === "today") {
        startDate = moment().startOf("day");
        endDate = moment().endOf("day");
      } else if (period === "thisWeek") {
        startDate = moment().startOf("day");
        endDate = moment().add(7, "days").endOf("day");
      } else if (period === "thisMonth") {
        startDate = moment().startOf("day");
        endDate = moment().add(30, "days").endOf("day");
      } else if (period === "all") {
        // nothing to do
      } else {
        return res
          .status(400)
          .json({ message: "Invalid period parameter", success: false });
      }

      if (startDate && endDate) {
        query.dueDate = { $gte: startDate.toDate(), $lte: endDate.toDate() };
      }

      const tasks = await Task.find(query);

      res.status(200).json({ tasks, success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", success: false });
    }
  },

  // Get all tasks by week
  getAllTasksByWeek: async (req, res) => {
    try {
      const { period, status } = req.params;
      const userId = req.user.id;
      let query = {};
      let startDate, endDate;

      if (period === "today") {
        startDate = moment().startOf("day");
        endDate = moment().endOf("day");
      } else if (period === "thisWeek") {
        startDate = moment().startOf("day");
        endDate = moment().add(7, "days").endOf("day");
      } else if (period === "thisMonth") {
        startDate = moment().startOf("day");
        endDate = moment().add(30, "days").endOf("day");
      } else if (period === "all") {
        // nothing to do
      } else {
        return res
          .status(400)
          .json({ message: "Invalid period parameter", success: false });
      }

      query.userRefId = userId;

      if (startDate) {
        startDate.utc();
        endDate.utc();
      }

      if (status) {
        if (status === "backlog") {
          query.$or = [
            {
              status: { $in: ["BackLog", "InProgress", "ToDo", "Done"] },
              dueDate: { $lt: moment().startOf("day").toDate() },
            },
          ];
        } else {
          query.status = status;
        }
      }

      if (period !== "all" && status !== "BackLog") {
        query.$or = [
          { dueDate: { $gte: startDate.toDate(), $lte: endDate.toDate() } },
          { dueDate: null },
        ];
      }

      const tasks = await Task.find(query);

      res.status(200).json({ tasks, success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", success: false });
    }
  },
  //get task anlytics
  getTaskStatistics: async (req, res) => {
    try {
      const userId = req.user.id;

      const backlogCount = await Task.countDocuments({
        status: "BackLog",
        userRefId: userId,
      });
      const progressCount = await Task.countDocuments({
        status: "InProgress",
        userRefId: userId,
      });
      const todoCount = await Task.countDocuments({
        status: "ToDo",
        userRefId: userId,
      });
      const completedCount = await Task.countDocuments({
        status: "Done",
        userRefId: userId,
      });

      const lowPriorityCount = await Task.countDocuments({
        priority: "Low",
        userRefId: userId,
      });
      const moderatePriorityCount = await Task.countDocuments({
        priority: "Moderate",
        userRefId: userId,
      });
      const highPriorityCount = await Task.countDocuments({
        priority: "High",
        userRefId: userId,
      });

      const currentDate = new Date();
      const dueDateTasksCount = await Task.countDocuments({
        dueDate: { $lt: currentDate },
        userRefId: userId,
      });

      const statistics = {
        backlogCount: backlogCount,
        progressCount: progressCount,
        todoCount: todoCount,
        completedCount: completedCount,
        lowPriorityCount: lowPriorityCount,
        moderatePriorityCount: moderatePriorityCount,
        highPriorityCount: highPriorityCount,
        dueDateTasksCount: dueDateTasksCount,
      };

      res.status(200).json({ statistics, success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", success: false });
    }
  },
};
