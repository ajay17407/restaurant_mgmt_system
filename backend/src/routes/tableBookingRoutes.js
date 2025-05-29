import express from 'express';
import { cancelBooking, createBooking, updateBooking, getBookingSummary} from '../controllers/tableBookingController.js';
import verifyToken from '../middlewares/verifyToken.js';


const router = express.Router();

router.use(verifyToken);
router.post('/create',createBooking);
router.put('/update/:id',updateBooking);
router.delete('/cancel/:id',cancelBooking);
router.get('/:bookingId/summary',getBookingSummary);




export default router;