import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: background 1s ease-out;
  }

  header{
    display: flex;
    flex-direction: row;
  }

  .Router ul{
      display:flex;
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;
      color: ${({ theme }) => theme.text};
    }

  .Router li{
      display:flex;
      margin: 20px;
      align-self:center;
  }
  
  .Router a{
      text-decoration: none;
      font-size:24px;
  }

  .Router a:hover,
  .Router a:active{
      color:blue;
  }
  .Router a:visited{
      color:inherit;
  }


  
  `
//recovered from https://www.smashingmagazine.com/2020/04/dark-mode-react-apps-styled-components/