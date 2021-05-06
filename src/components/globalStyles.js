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
  
  `
//recovered from https://www.smashingmagazine.com/2020/04/dark-mode-react-apps-styled-components/