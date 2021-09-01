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

        const {data} = req.body

        if (!(await schema.isValid(data))){
            return res.status(400).json({error: 'Validation fails'});
        }

        const userExists: object | null = await userModel.getUserByEmail.v1(data.user_email);

        if (userExists) {
            return res.status(409).json({ error: "User already exists!" });
        }

        data.password_hash = await bcrypt.hash(data.password, 8);

        delete data.password;

        const { id_user, user_name, user_email, password_hash, user_permission } = await userModel.createUser.v1(data);

        return res.status(200).json({ id_user, user_name, user_email, password_hash, user_permission });
    }

    async getAll(req: Request, res: Response): Promise<object> {
        const allUsers: Array<object> = await userModel.getAllUsers.v1();

        if(!allUsers)
            return res.status(400).json({error: 'Error getting all users'});

        return res.status(200).json(allUsers);
    }

    async getById(req: Request, res: Response): Promise<object> {
        const userId: string = req.params.id;
        const id: number = parseInt(userId);

        const user: object | null = await userModel.getUser.v1(id);

        if(!user)
            return res.status(401).json({ error: "User not exists!" });

        return res.status(200).json(user);
    }

    async getByEmail(req: Request, res: Response): Promise<object> {
        const userEmail: string = req.params.email;
        const user: object | null = await userModel.getUserByEmail.v1(userEmail);

        if(!user)
            return res.status(401).json({ error: "User not exists!" });

        return res.status(200).json(user);
    }

    async removeUser(req: Request, res: Response) {
        const userId: number = req.body.data

        const updatedUser: object = await userModel.deleteUser.v1(userId);

        if(!updatedUser)
            return res.status(400).json({error: 'Error deleting user'});

        return res.status(200).json(updatedUser);
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

        const user: IDataUser | null = await userModel.getUser.v1(req.body.userId);

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

        const response: object = await userModel.updateUser.v1(UserId, dataUser);

        if(response){
            return res.status(200).json('Data updated successfully!');
        }else{
            return res.status(400).json({erro: "Error updating the data in the database"});
        }
    }
}

export default new UserController();