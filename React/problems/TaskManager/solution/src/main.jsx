import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ChakraProvider from './components/ui/provider.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
