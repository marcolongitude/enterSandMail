import * as Yup from 'yup';
import bcrypt from "bcryptjs";
import checkPassword from '../util/checkPassword';
import { Request, Response } from 'express';

import { requestAPI } from '../util/requestAPI'

import userModel from '../model/user';
import { Prisma } from '@prisma/client';

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
            password: Yup.string().min(6).required(),
            user_permission: Yup.string().required(),
        });

        const {data} = req.body

        if (!(await schema.isValid(data))){
            return res.status(400).json({error: 'Validation fails'});
        }

        const [userExists, errorGetUser] = await requestAPI(userModel.getUserByEmail.v1(data.user_email))

        if(errorGetUser instanceof Prisma.PrismaClientKnownRequestError){
            if(errorGetUser.code === 'P2025'){
                return res.status(409).json({ error: "An operation failed because it depends on one or more records that were required but not found. {cause}" });
            }
            return res.status(500).json({ error: "Error !!!!"});
        }

        if(userExists){
            return res.status(409).json({ error: "User already exists!" });
        }

        data.password_hash = await bcrypt.hash(data.password, 8);

        delete data.password;

        const [ , errorCreateuser] = await requestAPI(userModel.createUser.v1(data))

        if(errorCreateuser){
            if(errorCreateuser instanceof Prisma.PrismaClientKnownRequestError){
                if(errorCreateuser.code === 'P2002'){
                    return res.status(409).json({ error: "Unique constraint failed on the {constraint}"});
                }
            }
            return res.status(500).json({ error: "Error !!!!"});
        }

        return res.status(201).json('User created successfully!');
        
    }

    async getAll(req: Request, res: Response): Promise<object> {

        const [ users, errorGetAllUsers ] = await requestAPI(userModel.getAllUsers.v1())

        if(errorGetAllUsers instanceof Prisma.PrismaClientKnownRequestError){
            return res.status(500).json({error: 'Internal server error'});
        }

        if(!users.length){
            return res.status(400).json({ success: "Empty user list" });
        }

        return res.status(200).json(users);

    }

    async getById(req: Request, res: Response): Promise<object> {
        const userId: string = req.params.id;
        const id: number = parseInt(userId);

        const [ user, errorGetUserById ] = await requestAPI(userModel.getUser.v1(id))

        if(errorGetUserById instanceof Prisma.PrismaClientKnownRequestError){
            if(errorGetUserById.code === 'P2025'){
                return res.status(409).json({ 
                    error: errorGetUserById.meta, 
                    codePrisma: errorGetUserById.code, 
                    clientVersion: errorGetUserById.clientVersion 
                });
            }
            return res.status(500).json({error: 'Internal server error'});
        }

        return res.status(200).json(user);
    }

    async getByEmail(req: Request, res: Response): Promise<object> {
        const userEmail: string = req.params.email;

        const [userExists, errorGetUser] = await requestAPI(userModel.getUserByEmail.v1(userEmail))

        if(errorGetUser instanceof Prisma.PrismaClientKnownRequestError){
            if(errorGetUser.code === 'P2025'){
                return res.status(409).json({ error: "An operation failed because it depends on one or more records that were required but not found. {cause}" });
            }
            return res.status(500).json({ error: "Error !!!!"});
        }

        if(!userExists){
            return res.status(400).json({ error: "User not found!" });
        }

        return res.status(200).json(userExists);
    }

    async removeUser(req: Request, res: Response): Promise<object> {
        const userId: number = req.body.data

        const [ errorDeleteUser ] = await requestAPI(userModel.deleteUser.v1(userId))

        if(errorDeleteUser instanceof Prisma.PrismaClientKnownRequestError){
            if(errorDeleteUser.code === 'P2025'){
                return res.status(409).json({ 
                    error: errorDeleteUser.meta, 
                    codePrisma: errorDeleteUser.code, 
                    clientVersion: errorDeleteUser.clientVersion 
                });
            }
            return res.status(500).json({error: 'Internal server error'});
        }

        return res.status(200).json('User deleted successfully!');
    }

    async activateUser(req: Request, res: Response): Promise<object> {
        const userId: number = req.body.data

        const [ userExists, errorActivateUser ] = await requestAPI(userModel.activateUser.v1(userId))

        if(userExists){
            if(userExists.user_active === 'active' ) {
                return res.status(400).json({ error: "User already active!" });
            }
            return res.status(200).json('User activated successfully!');
        }

        if(errorActivateUser instanceof Prisma.PrismaClientKnownRequestError){
            if(errorActivateUser.code === 'P2025'){
                return res.status(409).json({ 
                    error: errorActivateUser.meta, 
                    codePrisma: errorActivateUser.code, 
                    clientVersion: errorActivateUser.clientVersion 
                });
            }
        }
        
        return res.status(500).json({error: 'Internal server error'});
        
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