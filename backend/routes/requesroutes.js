import express from 'express';
import { createRequest, getNearRequests, getMyRequests, deleteRequest } from '../controllers/requestController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', protect,createRequest);
router.get('/nearby', protect,getNearRequests);
router.get('/my', protect, getMyRequests);

// added this route to delete a request
router.delete('/:requestId', protect, deleteRequest);

export default router;