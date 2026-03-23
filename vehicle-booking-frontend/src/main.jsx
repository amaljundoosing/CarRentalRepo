import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { VehicleProvider } from "./context/VehicleContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VehicleProvider> <App /></VehicleProvider>

  </StrictMode>,
)
