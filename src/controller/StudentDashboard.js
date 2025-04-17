import AuthModel from "../models/AuthenticationModel.js";
import mongoose from "mongoose";

const getAttendanceByStudentId= async(req,res)=>{
    
  const {id} = req.params;
  
  try {
    const response = await AuthModel.find(id);
      res.status(200).send({
        success: true,
        message: "Attendance fetched by studentId successfully",
        response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: "Internal Server Error",
        error:error.message
      });
    }
  }
  
  export default getAttendanceByStudentId