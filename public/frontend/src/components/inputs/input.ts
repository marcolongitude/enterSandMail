import styled, {css} from 'styled-components'
import { colors } from '../../styles'


interface IProps {
  width?: keyof typeof theme.width
  height?: keyof typeof theme.height
  error: boolean
}

const theme = {
  width: {
    block: '100%',
    medium: '75%',
    xsmall: '45%',
  },
  height: {
    thin: '30px',
    medium: '45px',
    large: '55%'    
  }
}

export const Input = styled('input').attrs<IProps>(() => ({
}))<IProps>`
  ${({
    width = 'block',
  }) => css`

    width: ${theme.width[width]};
    min-width: 80%;
    margin: 10px 0 10px 0;
    background-color: ${colors.backgroundInput};
    height: 46px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px;
    border: ${(props: IProps) => props.error ? '1px solid red': `1px solid ${colors.blueActive}`};
    ::placeholder,
    ::-webkit-input-placeholder {
        color: ${colors.placeholder};
        font-size: 15px;
    }
    :-ms-input-placeholder {
        color: ${colors.placeholder};
        font-size: 15px;
    }
    &:focus {
        outline: none;
    }


  `}
`
