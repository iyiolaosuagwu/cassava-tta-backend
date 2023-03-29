import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { verifyAccessToken } from '../utils/jwt';

const auth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return next(createError.Unauthorized('Access token is required'))
    }

    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return next(createError.Unauthorized())
    }

    await verifyAccessToken(token).then((user: any) => {
        const reqBody: any = req
        reqBody.user = user
        next()
    }).catch (e => {
        next(createError.Unauthorized(e.message))
    })
}

export default auth;