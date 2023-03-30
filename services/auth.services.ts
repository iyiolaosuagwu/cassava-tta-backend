import { CreateUser, LoginUser } from './../dtos/index';
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import { signAccessToken } from '../utils/jwt';
import prisma from '../client';


dotenv.config();

class AuthService {
    static async register(data: CreateUser) {
        const {email} = data;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt)
        const userExists = await prisma.user.findFirst({
            where: {
                email
           }
       });

        if (userExists) {
            throw createError.NotFound('User already exists')
        }
        
        data.password = hash
        let user: any = await prisma.user.create({
            data
        })

        if (user) {
            return data;
        }
    }
    
    static async login(data: LoginUser) {
        const { email, password } = data;
        const user: any = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            throw createError.NotFound('User not registered')
        }
        
        const checkPassword = await bcrypt.compare(password, user.password)
        if (!checkPassword) throw createError.Unauthorized('Invalid credentials')
        delete user.password
        const accessToken = await signAccessToken(user)
        return { ...user, accessToken }
    }
}
  
export default AuthService;