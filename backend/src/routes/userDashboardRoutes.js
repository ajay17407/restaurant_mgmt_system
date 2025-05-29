import express from 'express';
import { getUserDashboard } from '../controllers/userDashboardController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.use(verifyToken);

router.get('/',getUserDashboard);

export default router;