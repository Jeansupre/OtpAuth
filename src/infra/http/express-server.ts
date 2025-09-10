import express from "express";
import authRoutes from "./routes/auth-routes";

export function createServer() {
  const app = express();
  app.use(express.json());
  app.use("/auth", authRoutes);
  return app;
}
