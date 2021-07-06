import React, { useState } from "react";
import { Container, BoxOption, TitleBoxOption, TextBoxOption, AreaDragFile, ButtonSubmit, Title } from './styles'

import XLSX from 'xlsx'

import { dataContactsUpload } from '../../api'
// import { useForm } from 'react-hook-form'
// import * as yup from "yup";
// import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosResponse } from "axios";

const SUPPORTED_FORMATS = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]

// const schema = yup.object().shape({
//   fileXLSX: yup
//     .mixed()
//     .required("Carregue um arquivo")
//     .test('fileFormat', 'Carregue um arquivo xlsx', (value) => {
//       console.log(value[0].type); return value && SUPPORTED_FORMATS.includes(value[0].type);
//     }),
// });



export const Home = (): JSX.Element => {
  
  const [isValidateForm, setIsValidateForm] = useState(false)

  const validateForm = async (value: any) => {
    const isValidate: boolean = value.includes(SUPPORTED_FORMATS)

    setIsValidateForm(!isValidate)
    return !isValidate
  }


  const [dataContacts, setDataContacts] = useState([])

  const onChangeFile = (e: any) => {
    e.preventDefault();

    var files = e.target.files, f = files[0];

    if(!validateForm(e.target.files[0].type)){

      return 
    }

    var reader = new FileReader();

    reader.onload = function (e) {
        var data = e.target?.result;

        let readedData = XLSX.read(data, {type: 'binary'});

        const wsname = readedData.SheetNames[0];
        const ws = readedData.Sheets[wsname];
        const dataParse: any = XLSX.utils.sheet_to_json(ws, {header:0});

        setDataContacts(dataParse);
    };
    reader.readAsBinaryString(f)
  }

  const onSubmit = async (e: any) => 
  {
    e.preventDefault()

    const token: any = localStorage.getItem('reduxState')
    const res: AxiosResponse<any> | undefined = await dataContactsUpload('/readfilexlsx', dataContacts, token)
    
    res?.data.data.forEach((item: any) => {
      console.log({
        name: item.name,
        email: item.email
      })
    })

  }

  return (
    <Container>
      {/* <Title>Escolha uma opção</Title> */}
      <BoxOption>
        <TitleBoxOption>
          Carregar arquivo excel xlsx
        </TitleBoxOption>
          <AreaDragFile>
            <form onSubmit={onSubmit}>
              {/* <TextBoxOption>Arraste o arquivo para iniciar o envio</TextBoxOption> */}
              <input onChange={onChangeFile} type="file" name="fileXLSX" required />
              {isValidateForm && <span>Tipo de arquivo não suportado</span>}
              <ButtonSubmit type="submit">Selecione um arquivo para carregar</ButtonSubmit>
            </form>
          </AreaDragFile>
      </BoxOption>
      <BoxOption>
        <TitleBoxOption>
            Carregar dados em banco
        </TitleBoxOption>
        <AreaDragFile>
          <TextBoxOption>
            Dados salvos no banco de dados
          </TextBoxOption>
          <ButtonSubmit type="submit">Carregar dados</ButtonSubmit>
        </AreaDragFile>
      </BoxOption>
    </Container>
  )
}

export default Home;