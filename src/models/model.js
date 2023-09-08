const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    completed:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

//This name 'Todo' is your collection name under 'test' database
//I changed it from 'TodoDB' to 'Todo', so there are two collections under my 'test' now.
module.exports = mongoose.model('Todo',TodoSchema);