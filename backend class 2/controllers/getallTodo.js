const mongoose = require("mongoose");
const Todo = require("../models/index")
const getallTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200)
            .json({
                success: true,
                data: todos,
                message: "Entire Toda data fatched"
            })
    } catch (err) {
        console.log("connection cehcek error: ", err)
        res.status(500)
            .json({
                success: false,
                error: err.message,
                message: "This is not a game"
            })
    }
}

const getSingleId = async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await Todo.findById({ _id: id });

        if (!todo) {
            return res.status(404)
                .json({
                    sucess: false,
                    message: "No Data matched with the given I'd"
                })
        }

        res.status(200)
            .json({
                sucess: true,
                data: todo,
                message: "This data matched with your i'd"
            })
    }
    catch (err) {
        res.status(500)
            .json({
                sucess: true,
                message: "Server Side issue Pllzxx try agfter someTime"
            })
    }
}

module.exports = {
    getSingleId,
    getallTodos
}