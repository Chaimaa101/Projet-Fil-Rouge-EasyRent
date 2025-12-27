import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthProvider.jsx'
import { VehiculeProvider } from './Context/VehiculeProvider.jsx'
import { BrandProvider } from './Context/BrandProvider.jsx'
import { ReservationsProvider } from './Context/ReservationProvider.jsx'
import { AvisProvider } from './Context/AvisProvider.jsx'
import { UserProvider } from './Context/UsersContext.jsx'
import { AdminProvider } from './Context/AdminProvider.jsx'
import { PaymentProvider } from './Context/PaymentProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <VehiculeProvider>
    <BrandProvider>
    <AvisProvider>
    <UserProvider>
    <AdminProvider>
    <ReservationsProvider>
    <PaymentProvider>
       
      <App />
    
    </PaymentProvider>
    </ReservationsProvider>
    </AdminProvider>
    </UserProvider>
    </AvisProvider>
    </BrandProvider>
    </VehiculeProvider>
    </AuthProvider>
  </StrictMode>
)

