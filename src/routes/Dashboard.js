import express from 'express'
import DashboardController from '../controller/Dashboard.js'


const router = express.Router()

router.get('/admin-dashboard',DashboardController.AdminDashboard)
router.post('/add-user',DashboardController.AddUser)
router.get('/get-student/:id',DashboardController.GetStudentById)
router.delete('/delete-user/:id',DashboardController.DeleteUser)
router.put('/edit-user/:id',DashboardController.EditUser)

export default router;