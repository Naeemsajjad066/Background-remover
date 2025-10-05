import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

const PORT=process.env.PORT || 5000;
const app=express();

await connectDB();

// API Routes

app.get('/',(req,res)=>{
    res.send('API is running....');
});
app.use('/api/user',userRouter);


app.use(express.json());
app.use(cors());


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});  