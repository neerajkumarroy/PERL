const mongoose = require("mongoose");
const crudSchema = new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    gender:String,
    salary:Number
});

module.exports = mongoose.model("crud",crudSchema);