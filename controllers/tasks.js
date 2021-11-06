const { createCustomError } = require("../errors/custom-errors");
const { asyncWrapper } = require("../middlewares/asyncWrapper");
const Task = require("../models/Task");

const getAllTasks = asyncWrapper(async (req, res) => {
   const tasks = await Task.find();
   res.status(200).json({ status: "success", data: tasks });
});

const createNewTask = asyncWrapper(async (req, res) => {
   if (req.body) {
      const task = await Task.create(req.body);
      res.status(201).json(task);
   }
});

const getTaskById = asyncWrapper(async (req, res, next) => {
   if (req.params.id) {
      const task = await Task.findOne({ _id: req.params.id }).exec();
      if (task) {
         return res.status(200).json({ status: "success", data: task });
      } else {
         return next(createCustomError("Not Found", 404));
      }
   }
});

const updateTask = asyncWrapper(async (req, res, next) => {
   if (req.params.id) {
      const task = await Task.findOneAndUpdate(
         { _id: req.params.id },
         req.body,
         {
            new: true,
            runValidators: true,
         }
      );
      if (!task) {
         return next(createCustomError("Not Found", 404));
      }
      return res.status(200).json({ status: "success", data: task });
   }
});

const deleteTask = asyncWrapper(async (req, res, next) => {
   if (req.params.id) {
      const task = await Task.findByIdAndDelete({ _id: req.params.id });
      if (!task) {
         return next(createCustomError("Not Found", 404));
      }
      return res.status(200).json({ status: "success", data: task });
   }
});

module.exports = {
   getAllTasks,
   createNewTask,
   getTaskById,
   updateTask,
   deleteTask,
};
