import express from 'express';
const router = express.Router();
import user from '../controllers/auth.controller';

// register
router.post('/register', user.register);

// login
router.post('/login', user.login);

export default router;