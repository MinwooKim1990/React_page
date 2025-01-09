import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from 'styled-components'

const theme = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#333333',
    primary: '#007bff',
    secondary: '#6c757d',
  },
  dark: {
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    primary: '#007bff',
    secondary: '#6c757d',
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme.light}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
