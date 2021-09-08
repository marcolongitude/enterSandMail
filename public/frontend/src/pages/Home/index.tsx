import React, { useState } from "react";
import { 
  Container, 
  BoxOption, 
  TitleBoxOption, 
  AreaDragFile, 
  ButtonFileUpload, 
  NavOption,
  Form 
} from './styles'

import { Text, TextButton } from '../../components/typography'
import { Button } from '../../components/button'

import XLSX from 'xlsx'

import { dataContactsUpload } from '../../api'
import { AxiosResponse } from "axios";

import Loading from '../../components/Loading'

const SUPPORTED_FORMATS = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]

export const Home = (): JSX.Element => {
  
  const [isValidateForm, setIsValidateForm] = useState(false)
  const [dataContacts, setDataContacts] = useState([])
  const [loading, setLoading] = useState(false)

  const validateForm = (value: any) => {
    const valid: boolean = value.includes(SUPPORTED_FORMATS)

    setIsValidateForm(valid)
    return valid
  }

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
    setLoading(true)
    e.preventDefault()

    if(!isValidateForm){
      setLoading(false)
      return 
    }

    const token: any = localStorage.getItem('reduxState')
    const res: AxiosResponse<any> | undefined = await dataContactsUpload('/readfilexlsx', dataContacts, token)

    console.log(res)

    setTimeout(()=> {
      setLoading(false)
    },4000)
  }

  return (
    <Container>
      {loading && 
        <Loading type="spinningBubbles" />
      }  
        {/* <Title>Escolha uma opção</Title> */}
      {!loading &&
        <NavOption>
          <BoxOption>
              <Text color='blueActive' size="medium" >Carregar arquivo excel </Text>
              <AreaDragFile>
                <Form onSubmit={onSubmit}>
                  {/* <TextBoxOption>Arraste o arquivo para iniciar o envio</TextBoxOption> */}
                  <ButtonFileUpload onChange={onChangeFile} type="file" name="fileXLSX" />
                  {!isValidateForm && 
                    <Text color="blueActive" size="xsmall">Tipo de arquivo não suportado</Text>}
                  <Button width="medium" color="blueActive" type="submit">
                    <TextButton size="exsmall" >Selecione um arquivo para carregar</TextButton>
                  </Button>
                </Form>
              </AreaDragFile>
          </BoxOption>
  
          <BoxOption>
            <TitleBoxOption>Carregar do banco</TitleBoxOption>
              <AreaDragFile>
                <Form >
                  {/* <TextBoxOption>Arraste o arquivo para iniciar o envio</TextBoxOption> */}
                  <Button width="medium" color="green" type="submit">
                    <TextButton size="exsmall" >Enviar emails</TextButton>
                  </Button>
                </Form>
              </AreaDragFile>
          </BoxOption>
        </NavOption>
      }
    </Container>
  )
}

export default Home;