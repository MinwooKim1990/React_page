import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from 'styled-components'
import ReactGA from 'react-ga4'

// Google Analytics 초기화
ReactGA.initialize('G-8FFLKVL5L6')

// 페이지 뷰 추적
ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });

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
