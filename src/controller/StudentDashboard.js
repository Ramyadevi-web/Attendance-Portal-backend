import AuthModel from "../models/AuthenticationModel.js";


const getAttendanceByStudentId= async(req,res)=>{
    
  const {id} = req.params; //destructuring id from params
  
  if(!id){ //to handle invalid id
    return res.status(400).send({
      success: false,
      message: "Invalid id",
    });
  }
  
  try {
    const response = await AuthModel.findById(id);//query to find details of given id.
      res.status(200).send({
        success: true,
        message: "Attendance fetched by studentId successfully",
        response
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Internal Server Error",
        error:error.message
      });
    }
  }
  
  export default getAttendanceByStudentId