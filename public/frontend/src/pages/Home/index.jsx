import React from "react";
import { Container, BoxOption, TitleBoxOption, TextBoxOption, AreaDragFile, ButtonSubmit, Title } from './styles'

import { fileUpload } from '../../api'

import { useForm } from 'react-hook-form'


export const Home = () => {

  const { register, handleSubmit } = useForm()

  const onSubmit = async(data) => {
    const formData = new FormData()
    const token = localStorage.getItem('reduxState')

    formData.append('fileXLSX', data.fileXLSX[0])
    const res = await fileUpload('/readfilexlsx', formData, token)

    console.log(res.data)

    alert(res.data.message)

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
              <input {...register("fileXLSX")} type="file" name="fileXLSX" />
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