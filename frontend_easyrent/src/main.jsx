import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthProvider.jsx'
import { VehiculeProvider } from './Context/VehiculeProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <VehiculeProvider>
      <App />
    </VehiculeProvider>
    </AuthProvider>
  </StrictMode>
)

