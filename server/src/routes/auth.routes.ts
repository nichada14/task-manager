import { Router } from 'express';
import { registerUser, loginUser, getMe, logoutUser } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/logout', logoutUser);

router.get('/public', (req, res) => {
    res.json({ message: 'This is a public task route' });
});

export default router;
