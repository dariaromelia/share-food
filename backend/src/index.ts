import dotenv from 'dotenv';
import express from 'express';
import db_init from './database/db_init';
import cors from 'cors';
import masterRouter from './routes/masterRouter';
import userRouter from './routes/userRouter';
import foodItemRouter from './routes/foodItemRouter';

dotenv.config();

const app  = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000',
    methodsd: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

db_init();

app.use('/api', masterRouter);
app.use('/api/user', userRouter);
app.use('/api/food_item', foodItemRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});