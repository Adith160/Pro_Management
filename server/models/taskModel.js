const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    dueDate:{
        type: Date,
    },
    priority:{
        type: String,
        default: "Low",
        require: true,
    },
    status:{
        type: String,
        default: "BackLog",
        require: true,
    },
    checklists:{
        type: Array,
        required: true,
    },
    userRefId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
})

module.exports = mongoose.model("Taks",taskSchema);