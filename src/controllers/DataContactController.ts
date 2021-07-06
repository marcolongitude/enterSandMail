import { Request, Response } from "express";

class DataContactController {
  async DataContacts(req: Request, res: Response){
    const data = req.body.data

    const contacts = data.map((element: any) => {
      return {
        name: element.Nome,
        email: element.Email
      }
    });
    return res.status(200).json({message: 'chegou aqui', data: contacts})
  }
}

export default new DataContactController()