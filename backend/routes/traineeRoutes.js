const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getAllCourses,
  subscribeCourse,
  getMySubscriptions,
  toggleFollowTrainer,
  getFollowing,
} = require("../controllers/traineeController");

const router = express.Router();

router.get("/courses", protect, getAllCourses);
router.post("/subscribe", protect, subscribeCourse);

// 🔥 FIX
router.get("/my-subscriptions", protect, getMySubscriptions);

// FOLLOW SYSTEM
router.post("/follow", protect, toggleFollowTrainer);
router.get("/following", protect, getFollowing);

module.exports = router;
