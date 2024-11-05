import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import {cloudinaryConnect} from './config/cloudinary.js';
import fileUpload from 'express-fileupload';
//load environment variable
dotenv.config();

//initialize express app
const app = express();

//connect to mongoDB server
connectDB();

//to parse json bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/',(req,res)=>{
    res.send('API is running at port');
});
// connecting to Cloudinary
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
cloudinaryConnect();

// Mounting Routes
app.use('/api/v1/', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`Server is running at port ${PORT}`)});

