import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Movies from './components/Movies'
import MovieInfo from './components/MovieInfo'
import Home from './components/Home'
import FullScreenLoader from './components/FullSreenLoader'

function App() {
   const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulálunk egy betöltési időt 2 másodpercig
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <>
      <Navbar/>
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieInfo />} />
          <Route path="/movies" element={<Movies />} />
      </Routes>
    </>
  )
}

export default App
