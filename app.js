import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/db.js';
import { model } from 'mongoose';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

import requesroutes from './routes/requesroutes.js';
import responseRoutes from './routes/responseRoutes.js';
import userRoutes from './routes/userRoutes.js';

app.use('/request', requesroutes);
app.use('/response', responseRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('popshop is running....');
});

export default app;
