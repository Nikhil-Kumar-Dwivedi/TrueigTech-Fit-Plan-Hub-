import { useEffect, useState } from "react";
import api from "../services/api";

export default function UserFeed() {
  const [plans, setPlans] = useState([]);
  const [subscribedPlans, setSubscribedPlans] = useState([]);
  const [following, setFollowing] = useState([]);

  const fetchPlans = async () => {
    const res = await api.get("/trainee/courses");
    setPlans(res.data);
  };

  const fetchSubscriptions = async () => {
    const res = await api.get("/trainee/my-subscriptions");
    setSubscribedPlans(res.data.map((s) => s.courseId._id));
  };

  const fetchFollowing = async () => {
    const res = await api.get("/trainee/following");
    setFollowing(res.data.map((t) => t._id));
  };

  useEffect(() => {
    fetchPlans();
    fetchSubscriptions();
    fetchFollowing();
  }, []);

  const isSubscribed = (courseId) =>
    subscribedPlans.includes(courseId);

  const isFollowing = (trainerId) =>
    following.includes(trainerId);

  const subscribePlan = async (courseId) => {
    if (!window.confirm("Are you sure you want to subscribe?")) return;

    try {
      await api.post("/trainee/subscribe", { courseId });
      alert("Subscribed successfully 🎉");
      fetchSubscriptions();
    } catch {
      alert("Already subscribed");
    }
  };

  const toggleFollow = async (trainerId) => {
    await api.post("/trainee/follow", { trainerId });
    fetchFollowing();
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Fitness Plans
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow"
          >
            <h2 className="text-lg font-bold text-orange-600 dark:text-violet-400">
              {plan.title}
            </h2>

            <p className="text-sm mt-1">
              Trainer:{" "}
              <span
                className={`font-semibold ${
                  isFollowing(plan.trainerId._id)
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {plan.trainerId.name}
              </span>
            </p>

            <p className="mt-2 font-semibold">
              ₹{plan.price} • {plan.duration} days
            </p>

            {isSubscribed(plan._id) ? (
              <>
                <p className="mt-3 text-green-600 font-medium">✔ Subscribed</p>
                <p className="mt-2 text-sm">{plan.description}</p>
              </>
            ) : (
              <>
                <p className="mt-3 text-gray-500 text-sm">
                  Subscribe to unlock details
                </p>
                <button
                  onClick={() => subscribePlan(plan._id)}
                  className="mt-3 w-full bg-orange-500 text-white py-2 rounded"
                >
                  Subscribe
                </button>
              </>
            )}

            <button
              onClick={() => toggleFollow(plan.trainerId._id)}
              className={`mt-3 w-full py-2 rounded ${
                isFollowing(plan.trainerId._id)
                  ? "bg-green-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {isFollowing(plan.trainerId._id)
                ? "Following"
                : "Follow Trainer"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
