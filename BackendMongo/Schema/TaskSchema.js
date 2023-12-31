const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    taskName:String,
    description:String,
    status:String,
    userId:mongoose.Schema.Types.ObjectId,
    addedBy:{
        type:Number,
        default:null
    },
},
{
    timestamps:true
});

module.exports = mongoose.model('userTasks',taskSchema);
