import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/db.js';
import authRoutes from './routes/authRoutes.js';
import requestroutes from './routes/requesroutes.js';
import responseRoutes from './routes/responseRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

connectDB();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});
app.set('io', io);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/requests', requestroutes);
app.use('/api/responses', responseRoutes);
app.use('/api/users', userRoutes);

// Socket.io events
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRequestRoom', (requestId) => {
    socket.join(requestId);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
