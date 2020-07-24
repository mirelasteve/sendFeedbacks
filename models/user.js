const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    googleId:String,
    linkedinId:String,
    githubId:String,
    facebookId:String,
    credits:{ type:Number, default:0},
    displayName:String,
    userEmails:Array
})

mongoose.model('users',userSchema)