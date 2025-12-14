import { useEffect, useState } from "react";
import api from "../services/api";

export default function TrainerDashboard() {
  const [plans, setPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
  });

  // Fetch trainer's plans
  const fetchPlans = async () => {
    const res = await api.get("/trainer/my-courses");
    setPlans(res.data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // CREATE / UPDATE handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      duration: Number(form.duration),
    };

    try {
      if (editingId) {
        // UPDATE
        await api.put(`/trainer/course/${editingId}`, payload);
      } else {
        // CREATE
        await api.post("/trainer/course", payload);
      }

      // RESET FORM & STATE
      setEditingId(null);
      setForm({
        title: "",
        description: "",
        price: "",
        duration: "",
      });

      // Refresh plans (acts like page reload)
      await fetchPlans();
    } catch (err) {
      console.error("Error saving plan:", err);
      alert("Something went wrong while saving the plan");
    }
  };

  // Edit handler
  const handleEdit = (plan) => {
    setEditingId(plan._id);
    setForm({
      title: plan.title,
      description: plan.description,
      price: plan.price,
      duration: plan.duration,
    });
  };

  // Delete handler
  const deletePlan = async (id) => {
    await api.delete(`/trainer/course/${id}`);
    fetchPlans();
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Trainer Dashboard
      </h1>

      {/* CREATE / EDIT PLAN */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-4 text-orange-600 dark:text-violet-400">
          {editingId ? "Edit Fitness Plan" : "Create Fitness Plan"}
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            className="border p-2 rounded"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <input
            className="border p-2 rounded"
            placeholder="Duration (days)"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            required
          />

          <input
            className="border p-2 rounded"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />

          <input
            className="border p-2 rounded col-span-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          <button
            className={`col-span-2 text-white py-2 rounded ${
              editingId
                ? "bg-green-500 hover:bg-green-600"
                : "bg-orange-500 hover:bg-orange-600 dark:bg-violet-500 dark:hover:bg-violet-600"
            }`}
          >
            {editingId ? "Update Plan" : "Create Plan"}
          </button>

          {/* Cancel Edit */}
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({
                  title: "",
                  description: "",
                  price: "",
                  duration: "",
                });
              }}
              className="col-span-2 border border-gray-400 text-gray-700 dark:text-gray-200 py-2 rounded"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* PLANS LIST */}
      <div>
        <h2 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
          Your Plans
        </h2>

        {plans.length === 0 && (
          <p className="text-gray-500">No plans created yet.</p>
        )}

        {plans.map((plan) => (
          <div
            key={plan._id}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-3 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{plan.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                ₹{plan.price} • {plan.duration} days
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(plan)}
                className="text-blue-500 hover:text-blue-600"
              >
                Edit
              </button>

              <button
                onClick={() => deletePlan(plan._id)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
