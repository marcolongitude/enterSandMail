import styled, {css} from 'styled-components'
import { theme } from './constants'


type IProps ={
  color?: keyof typeof theme.colors;
  width?: keyof typeof theme.width;
  height?: keyof typeof theme.height;
}

export const Button = styled('button').attrs<IProps>(() => ({}))<IProps>`
  ${({
    color = 'blue',
    width = 'block',
    height = 'medium'
  }) => css`
    width: ${theme.width[width]};
    background-color: ${theme.colors[color]};
    height: ${theme.height[height]};
    cursor: pointer;
    margin: 15px 0 0 0;
    color: white;
    border: none;
    border-radius: 6px;
    transition: 0.3s;
    opacity: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:hover {
      opacity: 1.0
    }
    
  `
  }
`