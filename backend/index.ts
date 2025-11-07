import express, { type Request, type Response } from "express";
import http from "http";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.ts";
import authRoutes from "./routes/auth.routes.ts";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Database connection + start server
connectDB()
  .then(() => {
    console.log("✅ Database connected successfully".green);
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`.bgMagenta);
    });
  })
  .catch((error) => {
    console.log("❌ Failed to start server due to DB connection error".bgRed);
    console.error(error);
  });
