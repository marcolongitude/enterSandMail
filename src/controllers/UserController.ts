import * as Yup from 'yup';
import bcrypt from "bcryptjs";

import checkPassword from '../util/checkPassword';

import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

class UserController {
    
    //função criar usuario
    async create(req: Request, res: Response) {

        const schema = Yup.object().shape({
            user_name: Yup.string().required(),
            user_email: Yup.string().email().required(),
            password: Yup.string().required(),
            user_permission: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))){
            return res.status(400).json({error: 'Validation fails'});
        }

        const userExists = await prisma.users.findUnique({ where: { user_email: req.body.user_email } });

        if (userExists) {
            return res.status(400).json({ error: "User already exists!" });
        }

        req.body.password_hash = await bcrypt.hash(req.body.password, 8);

        delete req.body.password;

        const { id_user, user_name, user_email, password_hash, user_permission } = await prisma.users.create({
            data: req.body
        });

        return res.json({ id_user, user_name, user_email, password_hash, user_permission });
    }

    //função para listar todos os usuários
    async getAll(req: Request, res: Response) {
        const allUsers = await prisma.users.findMany();
        return res.json(allUsers);
    }
    
    //função para listar usuário por id
    async getById(req: Request, res: Response) {
        const userId = req.params.id;
        const id = parseInt(userId);

        const user = await prisma.users.findUnique({where: { id_user: id } });
        return res.json(user);
    }

    //função para listar usuario por email
    async getByEmail(req: Request, res: Response) {
        const userEmail = req.params.email;
        const user = await prisma.users.findUnique({where: { user_email: userEmail } });
        return res.json(user);
    }

    //função atualizar dados do usuario
    async update(req: Request, res: Response) {

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

        const user = await prisma.users.findUnique({ where: { id_user: req.body.userId}});

        if(!user){
            return res.status(401).json({ error: "User not exists!" });
        }

        if (req.body.user_email !== user.user_email) {
            const userExists = await prisma.users.findUnique({ where: { user_email: req.body.user_email } });
            if (userExists) {
                return res.status(400).json({ error: "User already exists!" });
            }
        }

        if (req.body.oldPassword && !(await checkPassword(req.body.oldPassword, user.password_hash))) {
            return res.status(401).json({ error: "Password does not match " });
        }

        const password_hash = await bcrypt.hash(req.body.password, 8);
        const UserId = parseInt(req.params.id);

        const dataUser = {
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            password_hash: password_hash,
            user_permission: req.body.user_permission
        }

        const response = await prisma.users.update({
            where: {id_user: UserId},
            data: dataUser
        });

        // return res.json({ id_usuarios, nome_usuarios, email_usuarios });
        if(response){
            return res.status(200).json('Dados atualizados com sucesso!');
        }else{
            return res.status(400).json({erro: "erro ao atualizar os dados no banco"});
        }

    }

}

export default new UserController();