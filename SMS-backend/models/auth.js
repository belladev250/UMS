const mongoose = require('mongoose')
const authSchema = new mongoose.Schema({
 
    name:{
      type:String,
      required:true,
      min:3
    },
    username:{
        type:String,
        required:true,
        min:3
    },
    email:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
        min:6
    }

})

module.exports = mongoose.model("auths",authSchema)