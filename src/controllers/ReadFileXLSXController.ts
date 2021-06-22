import { Request, Response } from 'express';
import {readFileXLS} from '../util/readFileXLS';

class ReadFileXLSXReadController{

  
  async readFileXLSX(req: Request, res: Response){
    const body = req.body.fileXLSX;

    const data = readFileXLS('/home/marco/Documentos/dadosUsina.xlsx');

    return res.status(200).json({ data });

  }


}

export default new ReadFileXLSXReadController();