import AuthModel from '../models/AuthenticationModel.js'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { response } from 'express'
dotenv.config()

const SignUpUser = async (req,res)=>{

    const email = await AuthModel.findOne({email:req.body.email})
  
    if(email){ //to restrict duplicate mail id.
      return res.status(400).send({
         success: false,
        message:`User with this email ${req.body.email} already exist`
       })
    }
    
    const student = new AuthModel(req.body); //create authModel instance

    student.save().then((response)=>{
      if(response._id){
         res.status(200).send({
            success: true,
           message:"User signedUp succesfully",
           student
          })
      }else{
         res.status(500).send({
            success:false,
            message:"Internal Server Error"
         })
      }
    }).catch((error)=>{
      res.status(400).send({
         success:false,
         error:error
      })
    }) 
 }

 const SignInUser = (req,res)=>{

   const { email,password } = req.body

   if(!email || !password){ //To handle empty field
      res.status(400).send({
         success:false,
         message:"Invalid Email Id or Password"
      })
   }
      AuthModel.findOne({email:email})
      .then((response)=>{
         if(response && response._id){
            if(response.password === password){

               const token = jwt.sign({
                                        roles:[response.role],
                                        uid:response._id
                                       },process.env.RESET_SECRET_KEY,{ expiresIn:"5m"}) //token created
               res.status(200).send({
                  success:true,
                  message:"User Signed In Successfully",
                  token:token,
                  id:response._id
               })
            }else{
                res.status(400).send({
                  success:false,
                  message:"Incorrect Password"
               })
            }
          }else{
            res.status(400).send({
               success:false,
               message:"Account does not exist"
            })
         }
      })
      .catch((error)=>{
         res.status(500).send({
            success:false,
            error:error
         })
      })
   }


 const ForgotPassword = (req,res)=>{

   const {email} = req.body;
   if (!email) { //to handle empty field
      return res.status(400).send({
        success: false,
        message: "Invalid email id",
      });
    }

   
     AuthModel.findOne({email:email})
     .then((response)=>{
      if(response && response._id){

         const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,        
              pass: process.env.EMAIL_PASS           
            }
          });
          const resetToken = jwt.sign({ id: response._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

         const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

          const message = {
            from: 'ramyadevim06@gmail.com',
            to: response.email, 
            subject: 'Password Reset Link',
            html: `<p>Click <a href="${resetUrl}">Reset Password </a> to reset password.</p>`
          };

          transporter.sendMail(message, (err, info) => {
            if (err) {
              console.error('Error while sending email:', err);
              return res.status(500).send({
                success: false,
                message: "Failed to send email",
                error: err.message
              });
            }
  
            console.log('Email sent:', info.response);
            return res.status(200).send({
              success: true,
              message: "Password reset link sent to your email address"
            });
          });

        return res.status(200).send({
            success:true,
            message:"Password reset link sent to your mail id",
            email:response.email 
         })
      }else{
         return res.status(400).send({
            success:false,
            message:"Invalid Account"
         })
      }
     })
     .catch((error)=>{
       return res.status(500).send({
         success:false,
         error:error.message
      })
     })
   
 }

 
 const ResetPassword = (req,res)=>{
       
   const {password,token} = req.body

   if(!password || !token){
      return res.status(400).send({
         success:false,
         message:"Invalid password or token"
      })
      }
    

      try {
         const decoded = jwt.verify(token,'ATTENDANCE2305')
         const userId = decoded.id;

         AuthModel.findByIdAndUpdate(userId, { password }, { new: true })
         .then((user) => {
           if (!user) {
             return res.status(400).send({
               success: false,
               message: "Invalid token or user not found",
             });
           }
   
           return res.status(200).send({
             success: true,
             message: "Password updated successfully",
           });
      } ).catch ((error)=> {
         
      })
   }catch (err) {
         return res.status(400).send({
           success: false,
           message: "Invalid or expired token",
         });
       }
   }
 
 export default {
    SignInUser,
    SignUpUser,
    ForgotPassword,
    ResetPassword
 }