import express from "express";
import {registerUser, loginUser, logoutUser, deleteUser,getUser} from "../controllers/userController.js"
import {  loginSchemaValidation,RegisterSchemaValidation } from "../validator/validation.js";

const router = express.Router();

router.post("/register", RegisterSchemaValidation, registerUser);

router.post("/login", loginSchemaValidation ,loginUser);

router.get('/get-user',getUser);

router.post("/logout", logoutUser);

router.delete("/deleteUser/:slug", deleteUser);

export default router