import express from 'express';
import { createRequest, getNearRequests } from '../controllers/requestController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect,createRequest);
router.get('/nearby', protect,getNearRequests);

export default router;