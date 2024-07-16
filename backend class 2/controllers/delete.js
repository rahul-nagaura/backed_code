const mongoose = require("mongoose");
const Todo = require("../models/index");

const findAndDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return res.status(404)
                .josn({
                    success: false,
                    message: "Your data dosen't matched"
                })
        }
        res.status(200)
            .json({
                success: true,
                data: todo,
                message: "Your data is deleted successfully"
            })
    }
    catch (err) {
        console.log("Error:", err);
        res.status(500)
            .json({
                success: false,
                message: "This is server side error"
            })
    }
}

module.exports = {
    findAndDelete
}