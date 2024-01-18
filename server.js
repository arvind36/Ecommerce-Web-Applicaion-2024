import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import cors from "cors";

// Create express app
const app = express();

// Config env
dotenv.config();

// Database config
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", CategoryRoutes);
app.use("/api/v1/product", ProductRoutes);

// Rest API
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Ecommerce App</h1>");
});

// Port
const PORT = process.env.PORT || 8080;

// Run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.NODE_ENV} mode on port ${PORT}`.bgCyan
      .white
  );
});
