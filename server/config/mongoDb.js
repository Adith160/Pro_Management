const mongoose = require('mongoose');
require("dotenv").config();

const db= mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Database Connected Successfully!!!")
}).catch((err)=>{
    console.log("Error while connecting DataBase",err)
})

module.exports = db