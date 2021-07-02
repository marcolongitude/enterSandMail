import React from "react";
import { Container, BoxOption, TitleBoxOption, TextBoxOption, AreaDragFile, ButtonSubmit, Title } from './styles'

import { fileUpload } from '../../api'
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosResponse } from "axios";

const FILE_SIZE = 1600000000000 * 1024;
const SUPPORTED_FORMATS = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]

const schema = yup.object().shape({
  fileXLSX: yup
    .mixed()
    .required("A file is required")
    .test('fileFormat', 'PDF only', (value) => {
      console.log(value[0].type); return value && SUPPORTED_FORMATS.includes(value[0].type);
    }),
});


interface IFormInputs {
  fileXLSX: any
}

export const Home = (): JSX.Element => {

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async(data: any) => {
    console.log(data)
    const formData: any = new FormData()
    const token: any = localStorage.getItem('reduxState')

    formData.append('fileXLSX', data.fileXLSX[0])
    const res: AxiosResponse<any> | undefined = await fileUpload('/readfilexlsx', formData, token)

    if(!res)
      alert('erro')

    alert(res?.data.message)

  }

  return (
    <Container>
      {/* <Title>Escolha uma opção</Title> */}
      <BoxOption>
        <TitleBoxOption>
          Carregar arquivo excel xlsx
        </TitleBoxOption>
          <AreaDragFile>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <TextBoxOption>Arraste o arquivo para iniciar o envio</TextBoxOption> */}
              <input {...register("fileXLSX")} type="file" name="fileXLSX" required/>
              {errors.fileXLSX && <span >{errors.fileXLSX?.message}</span>}
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