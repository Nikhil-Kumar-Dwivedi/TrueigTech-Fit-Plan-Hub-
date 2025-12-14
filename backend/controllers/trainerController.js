const Course = require("../models/Course");

// =======================
// CREATE COURSE
// =======================
exports.createCourse = async (req, res) => {
  try {
    if (req.user.role !== "trainer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { title, description, price, duration } = req.body;

    const course = await Course.create({
      title,
      description,
      price,
      duration,
      trainerId: req.user.id,
    });

    res.status(201).json(course);
  } catch (error) {
    console.error("Create course error:", error);
    res.status(500).json({ message: "Course creation failed" });
  }
};

// =======================
// GET TRAINER COURSES
// =======================
exports.getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ trainerId: req.user.id });
    res.json(courses);
  } catch (error) {
    console.error("Get courses error:", error);
    res.status(500).json({ message: "Failed to fetch courses" });
  }
};

// =======================
// UPDATE COURSE
// =======================
exports.updateCourse = async (req, res) => {
  try {
    if (req.user.role !== "trainer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { title, description, price, duration } = req.body;

    const updatedCourse = await Course.findOneAndUpdate(
      {
        _id: req.params.id,
        trainerId: req.user.id, // ensures ownership
      },
      {
        title,
        description,
        price,
        duration,
      },
      { new: true }
    );

    if (!updatedCourse) {
      return res
        .status(404)
        .json({ message: "Course not found or not authorized" });
    }

    res.json(updatedCourse);
  } catch (error) {
    console.error("Update course error:", error);
    res.status(500).json({ message: "Course update failed" });
  }
};

// =======================
// DELETE COURSE
// =======================
exports.deleteCourse = async (req, res) => {
  try {
    if (req.user.role !== "trainer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const deletedCourse = await Course.findOneAndDelete({
      _id: req.params.id,
      trainerId: req.user.id,
    });

    if (!deletedCourse) {
      return res
        .status(404)
        .json({ message: "Course not found or not authorized" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Delete course error:", error);
    res.status(500).json({ message: "Course deletion failed" });
  }
};
