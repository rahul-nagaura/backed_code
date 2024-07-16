const { createNewUser } = require("../controllers/createTodo");
const { getallTodos,getSingleId } = require("../controllers/getallTodo");
const {updateTodo} = require("../controllers/update");
const {findAndDelete} = require("../controllers/delete");
const express = require("express");

const router = express.Router();

router.post("/12345", createNewUser);
router.get("/getall",getallTodos);
router.get("/123/:id",getSingleId);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id",findAndDelete)

module.exports = router;