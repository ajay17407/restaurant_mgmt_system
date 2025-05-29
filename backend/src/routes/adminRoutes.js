import express from 'express';
import { getAdminDashboard } from '../controllers/adminController.js';
import verifyToken from '../middlewares/verifyToken.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { changeBookingStatus,makeUserAdmin,updatePreOrderStatus,deleteMenuItem,updateMenuItem } from '../controllers/adminController.js';

const router = express.Router();  

router.use(verifyToken,isAdmin);

router.get('/dashboard',getAdminDashboard);
router.put('/booking-status/:id',changeBookingStatus);
router.put('/promote/:userId',makeUserAdmin);
router.put('/status/:preOrderItemId',updatePreOrderStatus);
router.put('/:id',updateMenuItem);
router.delete('/:id',deleteMenuItem);

export default router;