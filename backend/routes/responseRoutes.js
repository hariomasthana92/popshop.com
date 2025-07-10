import express from 'express';
import { createResponse, getResponses,getResponsesByRequest,acceptResponse } from '../controllers/responseController.js'; 
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/create', protect ,createResponse);
router.get('/nearby', getResponses);
router.get('/:requestId', protect, getResponsesByRequest);
router.put('/accept/:responseId', protect, acceptResponse);


export default router;