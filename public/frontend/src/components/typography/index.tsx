import styled, {css} from 'styled-components'

interface IProps {
  color?: keyof typeof theme.colors
  size?: keyof typeof theme.sizes
  fontWeight?: 100 | 400 | 500 | 700
  level?: 1 | 2 | 3 | 4 | 5 | 6
}

const theme = {
  colors: {
    white: '#ffffff',
    black: '#111',
    gray: '#333',
    lightGray: 'CCC',
    blue: '#0077b6'
  },
  sizes: {
    exsmall: '0.9rem',
    xsmall: '1rem',
    small: '1.2rem',
    medium: '1.6rem',
    large: '2.4rem',
    xlarge: '3.2rem',
    xxlarge: '4.0rem'
  }
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
    color: ${theme.colors[color]};
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
    color: ${theme.colors[color]};
    font-weight: ${fontWeight};
  `}
`