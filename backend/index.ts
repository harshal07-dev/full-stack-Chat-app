import express from "express";
import http from "http";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

const server = http.createServer(app);

// async database connection and server start
connectDB()
  .then(() => {
    console.log(`Database connected`.green);
    server.listen(PORT, () => {
      console.log(`✅ Server is listening on PORT ${PORT}`.bgMagenta);
    });
  })
  .catch((error) => {
    console.log(
      `❌ Failed to start the server due to database connection error`.bgRed
    );
    console.error(error);
  });
