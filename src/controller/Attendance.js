import AuthModel from "../models/AuthenticationModel.js";
import mongoose from "mongoose";

const getAttendanceByDate = async(req,res)=>{
    
  const {date} = req.params;

  const start  = new Date(date);
  const end = new Date(date);

  end.setDate(end.getDate() + 1)
  
  try {
    const response = await AuthModel.find({
      attendance: {
        $elemMatch: {date:{
        $gte: start,
        $lt: end,
      }}
    },
    });

    const filteredData = response.map((student) => {
      const matchedAttendance = student.attendance.find((att) => {
        const attDate = new Date(att.date);
        return attDate >= start && attDate < end;
      });

      return {
        fullName: `${student.firstName} ${student.lastName}`,
        status: matchedAttendance?.status,
        date: matchedAttendance?.date,
      };
    });
    
    res.status(200).send({
      success: true,
      message: "Attendance fetched by date successfully",
      filteredData,
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


const attendanceReport = async (req, res) => {
  const { id, status, date } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid user ID",
      });
    }

    if (!date || isNaN(new Date(date))) {
      return res.status(400).send({
        success: false,
        message: "Invalid or missing date",
      });
    }

    const validStatuses = ["Present", "Absent"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).send({
        success: false,
        message: "Status is invalid. Must be 'Present' or 'Absent'.",
      });
    }

    const updatedUser = await AuthModel.findById(id);
    if (!updatedUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    updatedUser.attendance = updatedUser.attendance.filter(
      (entry) => entry && entry.date && entry.status
    );
    updatedUser.attendance.push({
      date: new Date(date),
      status,
    });

    await updatedUser.save();

    return res.status(200).send({
      success: true,
      message: "Attendance recorded successfully",
      updatedUser,
    });

  } catch (error) {
    console.error("Attendance error:", error.message);
    console.error(error.stack);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

const getAttendanceByStudentId= async(req,res)=>{
    
  const {id} = req.params;
  
  try {
    const response = await AuthModel.findById(id);
    console.log("res",response)

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
  

export default {
  getAttendanceByDate,
  attendanceReport,
  getAttendanceByStudentId
}