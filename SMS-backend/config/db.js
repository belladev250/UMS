const mongoose = require("mongoose")
mongoose.pluralize()
mongoose.connect("mongodb://localhost:27017/Users",
{ useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("connected successfully"))
.catch((err)=>console.log("failed to connect"))



