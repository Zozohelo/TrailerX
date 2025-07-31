
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { MovieContextProvider } from './contexts/MovieContext.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
    <MovieContextProvider>
    <App />
    </MovieContextProvider>
    </BrowserRouter>
)
