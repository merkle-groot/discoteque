const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Artist = new Schema({
    name:{
        type:String,
        required: true
    },
    img:{
        type:String,
        required: true
    },
    contract:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:false
    },
    lastfmId:{
        type:String,
        required: true
    }
})

module.exports = Artists = mongoose.model("artists",Artist) 
