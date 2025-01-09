import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #3a3a92;
    --secondary-color: #00b2ff;
    --background-light: #f5f8ff;
    --background-dark: #1a1a2e;
    --text-light: #2c3e50;
    --text-dark: #ecf0f1;
    --card-light: #ffffff;
    --card-dark: #16213e;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
    transition: background-color 0.3s ease, color 0.3s ease;

    &.dark-theme {
      background-color: var(--background-dark);
      color: var(--text-dark);
    }
  }

  #root {
    width: 100%;
    min-height: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  iframe {
    border: none;
  }

  ::selection {
    background: ${props => props.theme.primary};
    color: white;
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.backgroundColor};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.primary};
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.primaryDark};
  }
`;
