import React from 'react'
import styled, {css} from 'styled-components'
import { Text } from '../typography'
import { theme } from './constants'

type IProps ={
  color?: keyof typeof theme.colors;
  width?: keyof typeof theme.width;
  height?: keyof typeof theme.height;
}

const ContainerCard = styled('div').attrs<IProps>(() => ({}))<IProps>`
  ${({
    color = 'lightBlue',
    width = 'block',
    height = 'medium'
  }) => css`
    width: ${theme.width[width]};
    background-color: ${theme.colors[color]};
    height: ${theme.height[height]};

    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    padding: 20px;
    width: 85%;
    border: 0;
    border-radius: 12px;
  `
  }
`

type SimpleCardProps = {
  text: string;
}

export const SimpleCard = ({text}: SimpleCardProps) => {

  return (
    <ContainerCard>
      <Text size="medium" color="blue">{text}</Text>
    </ContainerCard>
  
  )

}