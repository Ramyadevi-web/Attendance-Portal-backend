import express from 'express'
import AuthRoutes from './Authentication.js';
import DashboardRoutes from './Dashboard.js'
import AttendanceRoutes from './Attendane.js'

const router = express.Router()

router.use('/auth',AuthRoutes)
router.use('/dashboard',DashboardRoutes)
router.use('/attendance',AttendanceRoutes)

export default router;