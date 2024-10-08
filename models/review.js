const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    
    ratings:{
        type:Number,
        min:0,
        max:5,
        
    },
    comment:String,

    createdAt:{
        type:Date,
        default:Date.now(),

    }
})

const review = mongoose.model("review",reviewSchema);
module.exports = review;