import AuthModel from '../models/AuthenticationModel.js'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

const SignUpUser = (req,res)=>{

    const student = new AuthModel(req.body);

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

   if(!email || !password){
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
                                       },"SECRET_KEY",{ expiresIn:"5m"})
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
   if (!email) {
      return res.status(400).send({
        success: false,
        message: "Invalid email id",
      });
    }

   
     AuthModel.findOne({email:email})
     .then((response)=>{
      if(response && response._id){

         // Generate SMTP service account from ethereal.email
            nodemailer.createTestAccount((err, account) => {
               if (err) {
                  console.error('Failed to create a testing account. ' + err.message);
                  return process.exit(1);
               }

               console.log('Credentials obtained, sending message...');

               // Create a SMTP transporter object
               let transporter = nodemailer.createTransport({
                  host: account.smtp.host,
                  port: account.smtp.port,
                  secure: account.smtp.secure,
                  auth: {
                     user: account.user,
                     pass: account.pass
                  }
               });

               // Message object
               let message = {
                  from: 'Sender Name <ramyadevim7@ethereal.com>',
                  to: 'Recipient <receiver@ethereal.com>',
                  subject: 'Nodemailer is unicode friendly ✔',
                  text: 'Hello to myself!',
                  html: '<p><b>Hello</b> to myself!</p>'
               };

               transporter.sendMail(message, (err, info) => {
                  if (err) {
                     console.log('Error occurred. ' + err.message);
                     return process.exit(1);
                  }

                  console.log('Message sent: %s', info.messageId);
                  // Preview only available when sending through an Ethereal account
                  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
               });
            });
        return res.status(200).send({
            success:true,
            message:"Password reset link sent to your mail id"
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

 export default {
    SignInUser,
    SignUpUser,
    ForgotPassword
 }