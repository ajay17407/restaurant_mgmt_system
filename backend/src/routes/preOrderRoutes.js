import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import { createPreOrder, getPreOrdersByBooking } from '../controllers/preOrderController.js';


const router = express.Router();

router.post('/',verifyToken,createPreOrder);
router.get('/:bookingId',getPreOrdersByBooking);


export default router;