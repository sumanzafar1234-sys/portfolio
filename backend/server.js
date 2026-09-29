const express = require("express");
const cors = require("cors");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "Suman Zafar Portfolio Backend is running 🚀"
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});