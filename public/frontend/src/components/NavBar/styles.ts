import styled from 'styled-components'
import { colors } from '../../styles'
import {Link} from 'react-router-dom';


export const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${colors.blueActive};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

export const UlMenu = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 306px;
`;

export const LiMenu = styled.li`
  text-decoration: none;
`;

export const LinkRedirect = styled(Link)`
  &:hover {
    color: ${colors.textTitle};
  }
`;