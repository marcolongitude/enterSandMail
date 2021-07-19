import styled, {css} from 'styled-components'
import { theme } from './constants'


interface IProps {
  color?: keyof typeof theme.colors
  size?: keyof typeof theme.width
  height?: keyof typeof theme.height
}

export const ButtonSubmit = styled('button').attrs<IProps>(() => ({}))<IProps>`
  ${({
    color = 'blue',
    size = 'block',
    height = 'medium'
  }) => css`
    width: ${theme.width[size]};
    background-color: ${theme.colors[color]};
    height: ${theme.height[height]};
    cursor: pointer;
    margin: 15px 0 0 0;
    height: 46px;
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