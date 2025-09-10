import express from "express";
import authRoutes from "./routes/auth-routes";
import * as http from 'http';

export function createServer() {
  const app = express();
  app.use(express.json());
  app.use("/auth", authRoutes);
  const servidor = http.createServer(app);
  return servidor;
}
