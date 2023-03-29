import express from 'express';
const router = express.Router();
import user from '../controllers/auth.controller';
import auth from '../middlewares/auth';

// register
router.post('/register', user.register);

// login
router.post('/login', user.login);

// all users
router.get('/', auth, user.all);

export default router;