const mongoose = require("mongoose");
const Todo = require("../models/index");

const updateTodo = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description } = req.body;
        const todo = await Todo.findByIdAndUpdate(
            id,
            { title, description, updatedAt: new Date()},{new:true}
        )
        if(!todo){
            return res.status(404)
                      .json({
                        success:false,
                        message: "Your I'd didn't match with any data"
                      })
        }
        res.status(200)
            .json({
                success: true,
                data: todo,
                message: "This is update"
        })
    }
    catch(err){
        console.log("This is error", err)
        res.status(500)
            .json({
                success:false,
                message:"data not found"
            })
    }
}

module.exports = {
    updateTodo
}