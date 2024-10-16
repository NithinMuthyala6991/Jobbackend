import mongoose from "mongoose";

const jobSchema  = mongoose.Schema({
    companyName : {
        type:String,
        required:true,
        trim:true
    },
    companyEmail : {
        type:String,
        required:true,
        trim:true
    },
    
    jobTitle :{
        type:String,
        required:true,
        trim:true
    },
    location :{
        type:String,
        required:true,
        trim:true
    },
    postedBy : {
        type : mongoose.Types.ObjectId,
        ref  : "usersSchema"
    },
    jobType : {
        type:String,
        required:true,
        trim:true
    },
    jobDescription : {
        type:String,
        required:true,
        trim:true
    },
    companyLogo : {
        type:String,
        // required:true,
       default : null
    }
})

export default mongoose.model('jobSchema' ,jobSchema)