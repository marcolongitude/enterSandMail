import { Request, Response } from 'express';
import {readFileXLS} from '../util/readFileXLS';

import multer from 'multer'
import path from 'path'

const maxSize = 100 * 1000 * 1000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ 
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb: any){
    const filetypes = /|xlsx|/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = path.extname(file.originalname).toLowerCase();
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(`Error: File upload only supports the following filetypes - ${filetypes}`);
  } 
}).single("fileXLSX"); 


class ReadFileXLSXReadController{
  async ReadFileXLSX(req: Request, res: Response){

    try {
      upload(req,res,function(err: any) {
        if(err) {
          res.status(500).json({error: err})
        }
        const response = readFileXLS('/home/marco/Documentos/myProjects/enterSandMail/uploads/dadosUsina.xlsx')
        return res.status(200).json({data: response, message: 'Arquivo carregado com sucesso'})
      })
      
    } catch (error) {
      console.log(error)
    }
  }
}

export default new ReadFileXLSXReadController();