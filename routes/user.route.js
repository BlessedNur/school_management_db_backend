const { Router } = require("express");
const router = Router();
const userController = require("../src/controllers/user.controller");
const userMiddleware = require("../src/middleware/user.middleware");
//ROUTES HERE

router.post("/add_user", userMiddleware.verifyUser, userController.addUser);
router.get("/get_users", userController.getUsers);
router.get("/students", userController.getStudents);
router.get("/instructors", userController.getInstructors);
router.delete("/instructors/:id", userController.deleteInstructor);
router.delete("/students/:id", userController.deleteStudent);

module.exports = router;
















