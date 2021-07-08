import { Request, Response } from "express";

import contactsModel from '../model/contacts'

class SaveContactsController {
  async SaveContacts(req: Request, res: Response){
    const data = req.body.data
    const contacts = data.map((element: any) => {
      return {
        contacts_email: element.Email,
        contacts_nome: element.Nome,
      }
    });

    const { count } = await contactsModel.saveContacts.v1(contacts);
    return res.status(200).json({message: 'Contatos salvos com sucesso', data: count})
  }
}

export default new SaveContactsController()