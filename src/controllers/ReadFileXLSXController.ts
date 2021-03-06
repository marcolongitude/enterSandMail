import { Request, Response } from 'express';
import {readFileXLS} from '../util/readFileXLS';

import multer from 'multer'
import path from 'path'
import pathRoot from '../../config'

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
  fileFilter: async function(req, file: Express.Multer.File, cb: (error?: any, info?: Partial<Express.Multer.File> | boolean) => void
  ){
    const filetypes = /xlsx|xls|csv|sheet|openxmlformats|spreadsheetml/
    const mimetype = filetypes.test(file.mimetype)
    const extname = path.extname(file.originalname).toLowerCase()
    
    if (mimetype && extname) {
      return cb(null, true)
    }
    return cb(`Error: File upload only supports the following filetypes - ${filetypes}`)
  } 
}).single("fileXLSX")


class ReadFileXLSXReadController{
  async ReadFileXLSX(req: Request, res: Response){
    try {

      
      upload(req, res, async function (err) {
        if (err) {
          console.log(err)
          return res.status(500).json({ error: err, message: 'erro de tipo de arquivo' })
        } else {
          const response = readFileXLS( pathRoot.path + '/uploads/dadosUsina.xlsx')
          return res.status(200).json({ data: response, message: 'Arquivo carregado com sucesso', status: 200 })
        }
      })
      
    } catch (error) {
      console.log(error)
      return res.status(501).json({error: 'Error ao criar o arquivo xlsx'})
    }

  }
}

export default new ReadFileXLSXReadController();