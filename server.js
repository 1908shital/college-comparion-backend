const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const collegeRoutes = require("./routes/collegeRoutes");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
// Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is running successfully",
    });
});

app.use("/api/colleges", collegeRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
