import styled, {css} from 'styled-components'



interface IProps {
  color?: keyof typeof theme.colors
  size?: keyof typeof theme.width
  height?: keyof typeof theme.height
}

const theme = {
  colors: {
    white: '#ffffff',
    black: '#111',
    gray: '#333',
    red: '#bb3e03',
    blue: '#0077b6'
  },
  width: {
    block: '100%',
    medium: '75%',
    xsmall: '1rem',
  },
  height: {
    thin: '30px',
    medium: '45px',
    large: '55%'    
  }
}

export const ButtonSubmit = styled('button').attrs<IProps>(() => ({
 
}))<IProps>`
  ${({
    color = 'blue',
    size = 'block',
    height = 'medium'
  }) => css`
    font-size: ${theme.width[size]};
    background-color: ${theme.colors[color]};
    height: ${theme.height[height]};
    cursor: pointer;
    margin: 15px 0 0 0;
    width: 90%;
    height: 46px;
    color: white;
    border: none;
    border-radius: 6px;
    transition: 0.3s;
    opacity: 0.8;

    
    &:hover {
      opacity: 1.0
    }
    
  `
  }
`