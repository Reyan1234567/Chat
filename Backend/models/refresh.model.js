import mongoose from "mongoose"
const refreshSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, required:true
    },
    token:{
        type:String, required:true
    },
    createdAt:{
        type: Date, default: Date.now, expires: "3d"
    }
})

const refresh=mongoose.model("refresh",refreshSchema)
export default refresh