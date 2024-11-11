const { Router } = require("express");
const router = Router();

const courseController = require("../src/controllers/course.controller");
//ROUTES HERE
router.post("/add_course", courseController.addCourse);
router.get("/get_course", courseController.getCourse);
router.delete("/:id", courseController.deleteCourse);
router.post("/enroll", courseController.enroll);

module.exports = router;
