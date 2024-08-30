import express from "express"
import { getUser,createUser,updateUser,deleteUser, getUserByFilter } from "../controller/user.js";

const user = express.Router();

user
    .get("/", getUser)
    .post("/create", createUser)
    .put("/:id", updateUser)
    .delete("/:id", deleteUser)
    .get("/filter", getUserByFilter)

export { user }