import mongoose from "mongoose";

const userSchma = mongoose.Schema({
    username : String,
    password : String,
    email : String,
    profilePicture : String,
    profilePictureText : String,
    profilePictureBgColor : String,
    creationDate : {
        type : Date,
        default : Date.now()
    }
})

const User = mongoose.model("User",userSchma)
export default User