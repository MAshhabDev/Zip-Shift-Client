import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { router } from './Routes/router.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Context/AuthContext/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />

    </AuthProvider>
  </QueryClientProvider>

)
