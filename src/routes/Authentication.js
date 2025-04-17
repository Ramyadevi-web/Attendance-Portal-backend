import express from 'express'
import AuthenticationController from "../controller/Authentication.js";


const router = express.Router()

router.post('/signIn',AuthenticationController.SignInUser)
router.post('/signUp',AuthenticationController.SignUpUser)
router.post('/forgotPassword',AuthenticationController.ForgotPassword)



export default router;