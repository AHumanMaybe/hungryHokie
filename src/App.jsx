import { useEffect } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Upload from './Pages/Upload'
import Log from './Pages/Log'
import Login from './Pages/Login'
import Manual from './Pages/Manual'
import './index.css'
import Navbar from './Components/Navbar'

function App() {
  useEffect(() => {

    localStorage.setItem("theme", "light")

    // Check if a theme is already set in localStorage
    const savedTheme = localStorage.getItem("theme");

    // If no theme is saved, default to "light"
    const theme = savedTheme ? savedTheme : "light";
    document.body.classList.add(theme);

    // Clean up any previous theme class on component unmount
    return () => {
      document.body.classList.remove("light", "dark");
    };
  }, [])
  return (
  <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Upload/>}/>
        <Route path="/log" element={<Log/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/manual" element={<Manual/>}/>
      </Routes>
    </BrowserRouter>
  </>
    
  )
}

export default App
