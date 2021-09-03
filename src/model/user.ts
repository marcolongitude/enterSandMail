import { PrismaClient, users } from '@prisma/client';
const prisma = new PrismaClient();

type DataCreateUserType = {
    user_name : string;
    user_email : string;
    password_hash : string;
}

export const createUser = {
    v1: async(body: DataCreateUserType): Promise<object> => {
        const response = await prisma.users.create({
            data: body
        });
        return response;
    }
}

export const getAllUsers = {
        v1: async(): Promise<Array<object>> => {
        return await prisma.users.findMany(
            {
                where: {
                    active: 'active'
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }
        );
    }
}

export const getUser = {
    v1: async(id:number)=> {
        return await prisma.users.findUnique({
            where: {
                id_user: id
            }
        });
    }
}

export const getUserByEmail = {
    v1: async(email: string): Promise<object | null> => {
        return await prisma.users.findUnique({
            where: { 
                user_email: email 
            } 
        });
    }
}

export const updateUser = {
    v1: async(id: number, dataUser: object) => {
        return await prisma.users.update({
            where: {id_user: id},
            data: dataUser
        })
    }
}

export const deleteUser = {
    v1: async(id: any) => {
        return await prisma.users.update({
            where: {id_user: id},
            data: {
                active: 'inactive'
            }
        })
    }
}

export default {
    createUser,
    getAllUsers,
    getUser,
    getUserByEmail,
    updateUser,
    deleteUser
}