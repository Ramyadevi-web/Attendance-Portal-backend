import express from 'express'
import DashboardController from '../controller/Dashboard.js'


const router = express.Router()

router.get('/admin-dashboard',DashboardController.AdminDashboard)
router.post('/add-user',DashboardController.AddUser)
router.delete('/delete-user/:id',DashboardController.DeleteUser)

export default router;