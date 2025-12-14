const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Fit Plan Hub Backend Running 🚀");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/trainer", require("./routes/trainerRoutes"));
app.use("/api/trainee", require("./routes/traineeRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
