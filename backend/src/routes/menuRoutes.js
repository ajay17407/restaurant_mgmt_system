import express from 'express';
import { createMenuItem,deleteMenuItem,getAllMenuItems, updateMenuItem } from '../controllers/menuController.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import verifyToken from '../middlewares/verifyToken.js';


const router  = express.Router();

router.post('/',verifyToken,isAdmin,createMenuItem);
router.get('/',getAllMenuItems);


export default router;