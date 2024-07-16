const Todo = require("../models/index");

const createNewUser = async (req,res) => {
    try {
        const { title, description } = req.body;
        const response = await Todo.create({ title, description });
        res.status(200).json({
            sucess: true,
            data: response,
            messsge: 'Entry Created successfully'
        });
    }
    catch(err){
        console.log(err);
        res.status(500)
        .json({
            message: "are yu dpnd"
        })
    }
}

module.exports = {
    createNewUser
};