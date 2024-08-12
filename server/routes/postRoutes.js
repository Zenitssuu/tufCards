import express from "express";
import {addPost, deletePost, editPost, getAllPosts} from "../controllers/postControllers.js"

const router = express.Router();

router.get("/get-questions",getAllPosts);

router.post("/add-question",addPost);

router.post("/edit-question/:slug", editPost);

router.delete("/delete/:slug", deletePost);

export default router