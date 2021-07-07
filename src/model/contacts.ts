import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const saveContacts = {
  v1: async(body: any)=> {
    await prisma.contacts.deleteMany({})
    const response = await prisma.contacts.createMany({
      data: body
    });
      return response;
  }
}

export default {
  saveContacts
}