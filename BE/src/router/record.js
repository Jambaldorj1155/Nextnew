import express from "express"
import { getRecord,createRecord,updateRecord,deleteRecord, getData, getDesc } from "../controller/record.js";

const record = express.Router();

record
    .get("/", getRecord)
    .get("/getData", getData)
    .post("/create", createRecord)
    .put("/:id", updateRecord)
    .delete("/:id", deleteRecord)
    .get("/getDesc", getDesc)

export { record }