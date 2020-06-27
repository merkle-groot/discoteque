const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Schema
const Intro = new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = Int = mongoose.model('intro',Intro);