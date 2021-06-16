import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import authConfig from "./authConfigJWT";
import userModel from '../model/user';

export default (permission: string)=> {
    const arrayPermission: Array<string> = permission.split('');

    const permissions: any = {
        super: 's',
        admin: 'a',
        comum: 'c',
    }

    return async(req: Request, res: Response, next: NextFunction) => {

        const token: any = req.headers.token;

        if (!token) {
            return res.status(401).json({ error: "Token not provided" });
        }

        try {
            const decoded: any = jwt.verify(token, authConfig.secret);

            const user: any = await userModel.getUser.v1(decoded.id_user);
           
            if(!user){
                throw new Error('User not found');
            }

            if(decoded.id_user !== user.id_user || decoded.user_permission !== user.user_permission){
                throw new Error('Token invalid');
            }

            if(!arrayPermission.includes(permissions[user?.user_permission])){
                throw new Error('Unauthorized');
            }

            req.body.userId = decoded.id_user;

            return next();
        } catch (err) {
            return res.status(401).json({ error: err.message });
        }
    }
};