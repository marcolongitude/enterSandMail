import * as Yup from 'yup';
import bcrypt from "bcryptjs";
import checkPassword from '../util/checkPassword';
import { Request, Response } from 'express';

import userModel from '../model/user';

interface IDataUser {
    user_name: string;
    user_email: string;
    password_hash: string;
    user_permission: string;
}

class UserController {

    async create(req: Request, res: Response): Promise<object> {

        const schema = Yup.object().shape({
            user_name: Yup.string().required(),
            user_email: Yup.string().email().required(),
            password: Yup.string().required(),
            user_permission: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Validation fails'});
        }

        const userExists = await userModel.getUserByEmail.v1(req.body.user_email);

        if (userExists) {
            return res.status(400).json({ error: "User already exists!" });
        }

        req.body.password_hash = await bcrypt.hash(req.body.password, 8);

        delete req.body.password;

        const { id_user, user_name, user_email, password_hash, user_permission } = await userModel.createUser.v1(req.body);

        return res.json({ id_user, user_name, user_email, password_hash, user_permission });
    }

    async getAll(req: Request, res: Response): Promise<object> {
        const allUsers = await userModel.getAllUsers.v1();
        return res.json(allUsers);
    }

    async getById(req: Request, res: Response): Promise<object> {
        const userId: string = req.params.id;
        const id = parseInt(userId);

        const user = await userModel.getUser.v1(id);
        return res.json(user);
    }

    async getByEmail(req: Request, res: Response): Promise<object> {
        const userEmail: string = req.params.email;
        const user = await userModel.getUserByEmail.v1(userEmail);
        return res.json(user);
    }

    async update(req: Request, res: Response): Promise<object> {
        const schema = Yup.object().shape({
            user_name: Yup.string(),
            user_email: Yup.string().email(),
            oldPassword: Yup.string(),
            password: Yup.string().min(6).when('oldPassword', (oldPassword: string, field: any)=> 
                oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string().when('password', (password: string, field: any) => 
                password ? field.required().oneOf([Yup.ref('password')]): field
            ),
            user_permission: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Validation fails'});
        }

        const user = await userModel.getUser.v1(req.body.userId);

        if(!user){
            return res.status(401).json({ error: "User not exists!" });
        }

        if (req.body.user_email !== user.user_email) {            
            return res.status(400).json({ error: "User does not match" });            
        }

        if (req.body.oldPassword && !(await checkPassword(req.body.oldPassword, user.password_hash))) {
            return res.status(401).json({ error: "Password does not match " });
        }

        const password_hash: string = await bcrypt.hash(req.body.password, 8);
        const UserId: number = parseInt(req.params.id);

        const dataUser: IDataUser = {
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            password_hash: password_hash,
            user_permission: req.body.user_permission
        }

        const response = await userModel.updateUser.v1(UserId, dataUser);

        if(response){
            return res.status(200).json('Data updated successfully!');
        }else{
            return res.status(400).json({erro: "Error updating the data in the database"});
        }
    }
}

export default new UserController();