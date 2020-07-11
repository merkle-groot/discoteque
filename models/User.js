const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
    name:{
        type:String,
        required: true
    },
    sessionToken:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: false
    }
})

module.exports = Users = mongoose.model('user',User);