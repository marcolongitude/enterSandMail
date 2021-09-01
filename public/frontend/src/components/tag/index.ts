import styled, {css} from 'styled-components'
import { theme } from './constants'

interface IProps {
  color?: keyof typeof theme.colors
  width?: keyof typeof theme.width
  height?: keyof typeof theme.height
}

export const Tag = styled('div').attrs<IProps>(() => ({}))<IProps>`
  ${({
    color = 'blue',
    width = 'medium',
    height = 'medium'
  }) => css`
    width: ${theme.width[width]};
    margin: 3px 3px;
    background-color: ${theme.colors[color]};
    height: ${theme.height[height]};
    cursor: pointer;
    color: white;
    border: none;
    border-radius: 4px;
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

