const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createCourse,
  getMyCourses,
  updateCourse,
  deleteCourse,
} = require("../controllers/trainerController");

const router = express.Router();

router.post("/course", protect, createCourse);
router.get("/my-courses", protect, getMyCourses);

// 🔥 ADD THESE
router.put("/course/:id", protect, updateCourse);
router.delete("/course/:id", protect, deleteCourse);

module.exports = router;
