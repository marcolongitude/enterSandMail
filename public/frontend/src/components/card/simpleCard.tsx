import React from 'react'
import styled, {css} from 'styled-components'
import { Text } from '../typography'
import { theme } from './constants'
import { colors } from '../../styles'

type IProps ={
  color?: keyof typeof colors;
  width?: keyof typeof theme.width;
  height?: keyof typeof theme.height;
}

const ContainerCard = styled('div').attrs<IProps>(() => ({}))<IProps>`
  ${({
    color = 'backgroundColorCard',
    width = 'block',
    height = 'medium'
  }) => css`
    width: ${theme.width[width]};
    background-color: ${colors[color]};
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
  color?: keyof typeof colors;
}

export const SimpleCard = ({text, color}: SimpleCardProps) => {

  return (
    <ContainerCard color={color}>
      <Text size="medium" color="blueActive">{text}</Text>
    </ContainerCard>
  
  )

}