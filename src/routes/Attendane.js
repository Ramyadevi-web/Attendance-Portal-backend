import express from 'express'
import AttendanceController from '../controller/Attendance.js'

const router = express.Router()

router.post('/attendance-report',AttendanceController.attendanceReport)
router.get('/attendance-by-date/:date',AttendanceController.getAttendanceByDate)
router.get('/attendance-by-studentid/:id',AttendanceController.getAttendanceByStudentId)

export default router;