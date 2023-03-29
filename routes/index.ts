import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import createError from 'http-errors';

// redirect to routes/auth.ts
import auth from './auth';

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/auth', auth);

router.use( async (req, res, next) => {
    next(createError.NotFound('Route not Found'))
})

router.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        status: false,
        message: err.message
    })
})

export default router;