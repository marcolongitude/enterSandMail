import styled, {css} from 'styled-components'
import { theme } from './constants'
import { colors } from '../../styles'


interface IProps {
  color?: keyof typeof colors
  size?: keyof typeof theme.sizes
  fontWeight?: 100 | 400 | 500 | 700
  level?: 1 | 2 | 3 | 4 | 5 | 6
}


export const Text = styled('h1').attrs<IProps>(({ level = 6}) => ({
  as: `h${level}`
}))<IProps>`
  ${({
    color = 'white',
    size = 'medium',
    fontWeight = 700,
  }) => css`
    font-size: ${theme.sizes[size]};
    color: ${colors[color]};
    font-weight: ${fontWeight};
  `}
`


export const TextButton = styled('span').attrs<IProps>(() => ({
 
}))<IProps>`
  ${({
    color = 'white',
    size = 'xsmall',
    fontWeight = 500,
  }) => css`
    font-size: ${theme.sizes[size]};
    color: ${colors[color]};
    font-weight: ${fontWeight};
  `}
`