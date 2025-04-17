import mongoose from "mongoose";

const AuthSchema = mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            default:"Student"
        },
        department:{
            type: String
        },
        attendance:[{
            date:{
            type:Date,
            required:true
        },
        status: {
          type: String,
          enum: ['Present', 'Absent'],
          required: true
        }
    }]
    }
)

const AuthModel = mongoose.model("userdata",AuthSchema)

export default AuthModel;