import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import AuthService from '../services/auth.services';

class authController {

    static register = async (req: any, res: Response, next: NextFunction) => {
        try {
            const user = await AuthService.register(req.body);
            res.status(200).json({
                status: true,
                message: 'User created successfully',
                data: user
            })
        }
        catch (e: any) {
            next(createError(e.statusCode, e.message))
        }
    }

    static login = async (req: Request, res: Response, next: NextFunction) => {
         try {
            const data = await AuthService.login(req.body)
            res.status(200).json({
                status: true,
                message: "Account login successful",
                data
            })
        }
        catch (e: any) {
            console.log(e)
            next(createError(e.statusCode, e.message))
        }
    }

    static all = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await AuthService.all();
            res.status(200).json({
                status: true,
                message: 'All users',
                data: users
            })
        }
        catch (e: any) {
            next(createError(e.statusCode, e.message))
        }
    }
}

export default authController;