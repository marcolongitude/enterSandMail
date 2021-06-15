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

export const getUsers = {
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
export default {
    createUser,
    getUsers,
    getUser,
}