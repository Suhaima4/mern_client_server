const mongoose = require('mongoose');
const router = require('../Routes/auth');


const RecipeSchema = new mongoose.Schema
({

    name:{type:String,required:true},
    ingredients:{type:String,required: true },
    description: { type:String },
    imageUrl:{type:String},
    userId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }]

})

const RecipeModel = mongoose.model("recipes", RecipeSchema)
 
 module.exports =RecipeModel ;
 

