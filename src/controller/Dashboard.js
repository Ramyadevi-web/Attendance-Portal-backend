import AuthModel from '../models/AuthenticationModel.js'

const AdminDashboard = (req,res)=>{

  AuthModel.find()
  .then((response)=>{
      res.status(200).send({
        success:true,
        msessage:"Data fetched successfully",
        users:response
      })
    }).catch((error)=> {
      res.status(500).send({
        success:false,
        message:error.message
      })
    })
  }

  const GetStudentById = (req,res)=>{

    let {id} = req.params;

    AuthModel.findById(id)
    .then((response)=>{
        res.status(200).send({
          success:true,
          msessage:"User data fetched by id successfully",
          users:response
        })
      }).catch((error)=> {
        res.status(500).send({
          success:false,
          message:error.message
        })
      })
    }
  

const AddUser = (req,res)=>{
  const user = new AuthModel(req.body);

  user.save().then((response)=>{
    if(response._id){
       res.status(200).send({
          success: true,
         message:"User added succesfully",
         user
        })
    }else{
       res.status(400).send({
          success:false,
          message:error.message
       })
    }
  }).catch((error)=>{
    res.status(500).send({
       success:false,
       error:error
    })
  }) 
}



const DeleteUser =async (req,res)=>{

  try{
  const userId = req.params.id;

  const deletedUser = await AuthModel.deleteOne({_id:userId});

   if(!deletedUser){
    return res.status(404).send({
      success:false,
      message:"User not found"
    })
   }
 
       res.status(200).send({
         success: true,
         message:"User deleted succesfully"
        })

  }catch(error){
    res.status(500).send({
       success:false,
       error:error.message
    })
  }
}

const EditUser =async (req,res)=>{

  try{
  const userId = req.params.id;

   await AuthModel.findByIdAndUpdate(userId,req.body, { new: true });

   if(!userId){
    return res.status(404).send({
      success:false,
      message:"User not found"
    })
   }
 
       res.status(200).send({
         success: true,
         message:"User updated succesfully"
        })

  }catch(error){
    res.status(500).send({
       success:false,
       error:error.message
    })
  }
}



export default {
    AdminDashboard,
    AddUser,
    DeleteUser,
    EditUser,
    GetStudentById
}