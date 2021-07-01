import React from "react";
import { Container, BoxOption, TitleBoxOption, TextBoxOption, AreaDragFile, ButtonSubmit, Title } from './styles'


export const Home = () => {
  return (
    <Container>
      {/* <Title>Escolha uma opção</Title> */}
      <BoxOption>
        <TitleBoxOption>
          Carregar arquivo excel xlsx
        </TitleBoxOption>
        <AreaDragFile>
          <TextBoxOption>
            Arraste o arquivo para iniciar o envio
          </TextBoxOption>
          <ButtonSubmit>Selecione um arquivo para carregar</ButtonSubmit>
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
          <ButtonSubmit>Carregar dados</ButtonSubmit>
        </AreaDragFile>
      </BoxOption>
    </Container>
  )
}

export default Home;