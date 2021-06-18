import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUser = {
    v1: async(body:any)=> {
        const response = await prisma.users.create({
            data: body
        });
        return response;
    }
}

export const getAllUsers = {
    v1: async()=> {
        return await prisma.users.findMany();
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
    v1: async(email: string) => {
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

export default {
    createUser,
    getAllUsers,
    getUser,
    getUserByEmail,
    updateUser
}