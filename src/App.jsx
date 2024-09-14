import { useEffect } from 'react'
import Upload from './Pages/Upload'
import './index.css'

function App() {
  useEffect(() => {

    localStorage.setItem("theme", "dark")

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
    <Upload/>
  </>
    
  )
}

export default App
