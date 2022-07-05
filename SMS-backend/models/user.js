const mongoose = require('mongoose')
const userSchema = mongoose.Schema({

    firstname:{
        required:true,
        type:String,
        min:3
    },
    lastname:{
        required:true,
        type:String,
        min:3
    },
    email:{
        required:true,
        type:String,
      
    },

    


})

module.exports= mongoose.model("users",userSchema);