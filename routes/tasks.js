const {
   getAllTasks,
   createNewTask,
   getTaskById,
   updateTask,
   deleteTask,
} = require("../controllers/tasks");
const router = require("express").Router();

router.route("/").get(getAllTasks).post(createNewTask);

router.route("/:id").get(getTaskById).patch(updateTask).delete(deleteTask);

module.exports.tasks = router;
