const Task = require("../models/Task");

const getAllTasks = async (req, res) => {
   try {
      const tasks = await Task.find();
      res.status(200).json({ status: "success", data: tasks });
   } catch (error) {
      res.status(500).json(error);
   }
};

const createNewTask = async (req, res) => {
   if (req.body) {
      try {
         const task = await Task.create(req.body);
         res.status(201).json(task);
      } catch (error) {
         res.status(500).json(error);
      }
   }
};

const getTaskById = async (req, res) => {
   if (req.params.id) {
      try {
         const task = await Task.findOne({ _id: req.params.id }).exec();
         if (task) {
            return res.status(200).json({ status: "success", data: task });
         } else {
            return res.status(404).send("Task not found!");
         }
      } catch (error) {
         return res.status(500).json(error);
      }
   }
   res.status(500).send("No params provided");
};

const updateTask = async (req, res) => {
   if (req.params.id) {
      try {
         const task = await Task.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            {
               new: true,
               runValidators: true,
            }
         );
         if (!task) {
            return res.status(404).send("Task Not Found!");
         }
         return res.status(200).json({ status: "success", data: task });
      } catch (error) {
         return res.status(500).json(error);
      }
   }
   res.status(404).send("No params provided");
};

const deleteTask = async (req, res) => {
   if (req.params.id) {
      try {
         const task = await Task.findByIdAndDelete({ _id: req.params.id });
         if (!task) {
            return res.status(404).send("No Task Found!");
         }
         return res.status(200).json({ status: "success", data: task });
      } catch (error) {
         res.status(500).json(error);
      }
   }
   res.status(404).send("No params provided");
};

module.exports = {
   getAllTasks,
   createNewTask,
   getTaskById,
   updateTask,
   deleteTask,
};
