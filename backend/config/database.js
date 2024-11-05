import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connect(process.env.URL)
.then(() => console.log("DB Connected Successfully"))
.catch( (error) => {
    console.log("DB Connection Failed");
    console.log(process.env.URL);
    console.error(error);
    process.exit(1);
} )
};

export default connectDB;
