import xlsx from 'xlsx'

export const readFileXLS = (): Array<object> => {
  var workbook = xlsx.readFile('/home/marco/Documentos/dadosUsina.xlsx');
  var sheet_name_list = workbook.SheetNames;
  var xlData: Array<object> = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
  console.log(xlData);
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxx')

  return xlData;
}

export default {
  readFileXLS
}