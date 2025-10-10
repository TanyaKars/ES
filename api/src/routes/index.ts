import { Router } from 'express';
import userRoutes from './users';

const router = Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'ES API' 
  });
});

// User routes
router.use('/users', userRoutes);

export default router;