import xlsx from 'xlsx'

export const readFileXLS = (pathFileXLXS: any): Array<object> => {
  var workbook = xlsx.readFile(pathFileXLXS);
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