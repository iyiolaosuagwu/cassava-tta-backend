import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import createError from 'http-errors';

dotenv.config();

const accessTokenSecret: any = process.env.ACCESS_TOKEN_SECRET;

const signAccessToken = (payload: any) => {
  return new Promise((resolve, reject) => {
      jwt.sign({ payload }, accessTokenSecret, {
      }, (err, token) => {
          if (err) {
            reject(createError.InternalServerError())
          }
          resolve(token)
      })
  })
}

const verifyAccessToken = (token: string) => {
  return new Promise((resolve, reject) => {
      jwt.verify(token, accessTokenSecret, (err: any, payload: any) => {
          if (err) {
              const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
              return reject(createError.Unauthorized(message))
          }
          resolve(payload)
      })
  })
}

export {
  signAccessToken,
  verifyAccessToken
}