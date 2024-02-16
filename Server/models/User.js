const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true}, 
    email: { type: String, required: true, unique: true },
    password: {type:String,required: true},
    savedRecipes:[{type:mongoose.Schema.Types.ObjectId,
    ref:"Recipe"}]
})

 const UserModel = mongoose.model("users",userSchema)
 module.exports = UserModel;