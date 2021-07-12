import styled from 'styled-components'
import { colors } from '../../styles'
import {Link} from 'react-router-dom';

interface Props {
  open: boolean
}

export const StyledBurger = styled('div')<Props>`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => open ? '#ccc' : '#fff'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

export const NavMenu = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 55px;
  border-bottom: 2px solid ${colors.blueActive};
  background-color: ${colors.blueActive};
  box-shadow: 0px 6px 13px -3px #000000c4;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .logo {
    padding: 20px 0;
    color: white;
  }
`;

export const UlMenu = styled('ul')<Props>`
  margin-right: 33px;
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    margin-top: 0px;
    margin-right: 0;
    flex-flow: column nowrap;
    background-color: #0d2538c2;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

export const LiMenu = styled.li`
  text-decoration: none;
`;

export const LinkRedirect = styled(Link)`
  &:hover {
    color: ${colors.textTitle};
  }
`;

export const ButtonLogout = styled.a`
  &:hover {
    color: ${colors.textTitle}
  }
`;