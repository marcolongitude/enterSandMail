import jwt from "jsonwebtoken";
import * as Yup from 'yup';
import checkPassword from '../util/checkPassword';
import AuthConfig from '../middlewares/authConfigJWT';

import { Request, Response } from "express";
import { requestAPI } from "../util/requestAPI";
import userModel from '../model/user';
import { Prisma } from ".prisma/client";


class SessionController {
  async store(req: Request, res: Response): Promise<object> {

    const schema = Yup.object().shape({
      user_email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if(!req.body.data){
      req.body.data = req.body
    }

    if (!(await schema.isValid(req.body.data))){
      return res.status(400).json({error: 'Validation fails'});
    }

    const { user_email, password } = req.body.data;

    const [userExists, errorGetUser] = await requestAPI(userModel.getUserByEmail.v1(user_email))

    console.log(errorGetUser)

    if(errorGetUser instanceof Prisma.PrismaClientKnownRequestError){
      if(errorGetUser.code === 'P2025'){
          return res.status(409).json({ error: "An operation failed because it depends on one or more records that were required but not found. {cause}" });
      }
      return res.status(500).json({ error: "Error !!!!"});
    }

    if (!userExists) {
      return res.status(401).json({ error: "User not found", status: 401 });
    }

    if (!(await checkPassword(password, userExists.password_hash))) {
      return res.status(401).json({ error: "Password does not Match" });
    }

    const { id_user, user_name, user_permission } = userExists;

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