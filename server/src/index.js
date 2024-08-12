import express from "express";
import mysql from "mysql";
import cors from "cors";
import { config } from "dotenv";
import { connectDB } from "./db/index.js";
import { PostRoutes, userRoutes } from "./routes/routes.js"
config();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));

//routes
app.use('/api/post',PostRoutes);
app.use('/api/user',userRoutes);

//error handling
app.use((err,req,res,next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error"
  res.status(err.statusCode).json({message:err.message})
})

const connection = connectDB();
app.listen(process.env.PORT || 3000, () => {
  console.log(`started listening on port ${process.env.PORT}`);
});

export default connection;
