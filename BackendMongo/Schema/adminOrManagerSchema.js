const mongoose = require("mongoose");

const adminOrManagerColumn = mongoose.Schema({
    name:String,
    role:String,
    userId:{
        type:mongoose.Types.ObjectId,
        default:null
    },
    email:String,
    password:String,
},{
    timestamps:true
});


module.exports = mongoose.model('adminOrManagers',adminOrManagerColumn);