import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import authConfig from "./authConfigJWT";

export default async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token not provided" });
    }

    const [, token] = authHeader.split(" ");

    try {
        
        // const decoded = await promisify(jwt.verify)(token, authConfig.secret);

        const decoded: any = jwt.verify(token, authConfig.secret);

        req.body.userId = decoded.id_user;

        return next();
    } catch (err) {
        return res.status(401).json({ error: "Token invalid" });
    }
};