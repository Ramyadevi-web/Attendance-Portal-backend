import mongoose  from "mongoose";


const initiateDBConnection = ()=>{
mongoose.connect("mongodb+srv://ramyadevim7:ramya7@cluster0.jcfco.mongodb.net/attendanceDB?retryWrites=true&w=majority&appName=Cluster0")
.then((response)=>{
    if(response.connections.length > 0){
        console.log("Database connection successful")
    }
})
.catch((err)=>console.log(err))
}

export default initiateDBConnection