const Course = require("../models/Course");
const Subscription = require("../models/Subscription");
const User = require("../models/User");


exports.getAllCourses = async (req, res) => {
  const courses = await Course.find().populate("trainerId", "name");
  res.json(courses);
};

exports.subscribeCourse = async (req, res) => {
  try {
    if (req.user.role !== "trainee") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { courseId } = req.body;

    const alreadySubscribed = await Subscription.findOne({
      traineeId: req.user.id,
      courseId,
    });

    if (alreadySubscribed) {
      return res.status(400).json({ message: "Already subscribed" });
    }

    const subscription = await Subscription.create({
      traineeId: req.user.id,
      courseId,
      paymentStatus: "success",
    });

    res.status(201).json({
      message: "Subscription successful",
      subscription,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Subscription failed" });
  }
};


exports.getMySubscriptions = async (req, res) => {
  const subscriptions = await Subscription.find({
    traineeId: req.user.id,
  }).populate("courseId");

  res.json(subscriptions);
};


exports.toggleFollowTrainer = async (req, res) => {
  const { trainerId } = req.body;

  const trainee = await User.findById(req.user.id);

  if (!trainee.following) trainee.following = [];

  const index = trainee.following.indexOf(trainerId);

  if (index > -1) {
    trainee.following.splice(index, 1);
    await trainee.save();
    return res.json({ message: "Unfollowed trainer" });
  }

  trainee.following.push(trainerId);
  await trainee.save();

  res.json({ message: "Trainer followed" });
};


exports.getFollowing = async (req, res) => {
  const trainee = await User.findById(req.user.id).populate(
    "following",
    "name"
  );

  res.json(trainee.following || []);
};
