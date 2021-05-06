import ChalkBackground from '../assets/images/chalk-background-vertical.jpg';

export const lightTheme = {
    main:'light',
    body: '#FFFCE9',
    text: '#363537',
    toggleBorder: '#FFF',
    backgroundColor: '#363537',
    subsectionTextBackgroundColor: '#CE834A',
    subsectionBackground: 'linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255))',
    subsectionBorder: '10px double black'
};
export const darkTheme = {    
    main:'dark',
    body: '#151515',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    backgroundColor: '#151515',
    subsectionTextBackgroundColor: '#1B5100',
    subsectionBackground: `linear-gradient(rgba(54, 53, 55, 0.1), rgba(54, 53, 55, 0.1)), url(${ChalkBackground})`,
    subsectionBorder: '10px solid black'
};

//recovered from https://www.smashingmagazine.com/2020/04/dark-mode-react-apps-styled-components/