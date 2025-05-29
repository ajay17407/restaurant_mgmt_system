import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import sequelize from './db/sequelize.js';
import { setupAssociations,models } from './models/associations.js';
import tableBookingRoutes from './routes/tableBookingRoutes.js';
import authRoutes from './routes/authRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import preOrderRoutes from './routes/preOrderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import userDashboardRoutes from './routes/userDashboardRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer,{
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    },
});

app.set('io',io);


app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/booking',tableBookingRoutes);
app.use('/api/menu',menuRoutes);
app.use('/api/preorders',preOrderRoutes);
app.use('/api/payment',paymentRoutes);
app.use('/api/dashboard',userDashboardRoutes);
app.use('/api/admin',adminRoutes);

io.on('connection',(socket) => {
    console.log('Client Connected',socket.id);

    socket.on('disconnect',() => {
        console.log("client disconnected",socket.id);
    });
});

const PORT = process.env.PORT;


setupAssociations();


sequelize.sync().then(() => {
    console.log("Database synced");
    httpServer.listen(PORT , () => {
        console.log(`server started on ${PORT}`);
        console.log(`Socket.IO available at ws://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("unable to connect to databse :",err);
});

export {app,io};

