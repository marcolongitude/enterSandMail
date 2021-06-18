import jwt from "jsonwebtoken";
import * as Yup from 'yup';
import checkPassword from '../util/checkPassword';
import AuthConfig from '../middlewares/authConfigJWT';

import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";


class SessionController {
  async store(req: Request, res: Response) {

    const prisma = new PrismaClient();

    const schema = Yup.object().shape({
      user_email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'});
    }

    const { user_email, password } = req.body;

    const user = await prisma.users.findUnique({ where: { user_email } });

    if (!user) {
      return res.status(401).json({ error: "user not found", status: 401 });
    }

    if (!(await checkPassword(password, user.password_hash))) {
      return res.status(401).json({ error: "Password does not Match" });
    }

    const { id_user, user_name, user_permission } = user;

    return res.json({
      user: {
        id_user,
        user_name,
        user_email,
        user_permission
      },
      token: jwt.sign({ id_user, user_permission }, AuthConfig.secret, {
        expiresIn: AuthConfig.expiresIn
      })
    });
  }
}

export default new SessionController();