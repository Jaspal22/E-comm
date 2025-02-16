import mongoose from "mongoose";

const connectDB = async() =>{
    mongoose.connection.on('connected',()=> {
        console.log(`Db connected to :-- ${process.env.MONGO_URI}`);
        
    })

    await mongoose.connect(`${process.env.MONGO_URI}/e-comm`)

}

export default connectDB;