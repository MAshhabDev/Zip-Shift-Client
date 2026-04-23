import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from './Routes/router.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Context/AuthContext/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />

  </AuthProvider>
)
