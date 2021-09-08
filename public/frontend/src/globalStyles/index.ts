// globalStyles.js
import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    /* background: rgb(163,163,163); */
    /* background: linear-gradient(0deg, rgba(163,163,163,1) 0%, rgba(83,5,116,1) 99%);  */
    margin: 0;
    padding: 60px 0 0 0;
    padding-bottom: 56px;
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

  body > #root {
    position: relative
  }
`;
 
export default GlobalStyle;