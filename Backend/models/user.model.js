import mongoose from "mongoose"

const user=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const User=mongoose.model("User",user)
export default User