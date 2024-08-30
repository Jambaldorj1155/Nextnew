import express from "express"
import { getCategory,createCategory,updateCategory,deleteCategory } from "../controller/category.js";

const category = express.Router();

category
    .get("/", getCategory)
    .post("/create", createCategory)
    .put("/:id", updateCategory)
    .delete("/:id", deleteCategory)

export { category }