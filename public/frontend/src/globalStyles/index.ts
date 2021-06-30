// globalStyles.js
import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    li {
      list-style-type: none;
      text-decoration: none;
    }
    ul {
      text-decoration: none;
      list-style: none;
    }
    a {
      text-decoration: none;
      color: white
    }
  }
`;
 
export default GlobalStyle;