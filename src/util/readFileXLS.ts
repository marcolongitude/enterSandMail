import xlsx from 'xlsx'

interface IXlData {
  Nome: string;
  Email: string;
  Telefone: number;
}
export const readFileXLS = (pathFileXLXS: any): Array<object> => {
  var workbook = xlsx.readFile(pathFileXLXS);
  var sheet_name_list = workbook.SheetNames;
  var xlData: Array<IXlData> = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

  let response: Array<object> = []

  xlData.forEach(element => {
    response.push({
      Nome: element.Nome,
      Email: element.Email
    })
  });

  return response;
}

export default {
  readFileXLS
}