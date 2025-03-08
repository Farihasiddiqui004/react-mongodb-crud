const express = require("express");
const cors = require("cors");
const connectDB = require("./db"); // Import DB Connection
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB(); // MongoDB Connection

app.use("/users", userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
