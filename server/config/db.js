import mongoose from "mongoose";

//funtion to connect db

const connectDB = async () =>{

    mongoose.connection.on('connected',() => console.log('Database Connected' )) 

    await mongoose.connect(`${process.env.MONGODB_URL}/job-portal`)

}

export default connectDB