import { useState, useEffect } from "react";

function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Load the saved theme index from localStorage (default to 0)
    const savedTheme = localStorage.getItem("themeIndex");
    return savedTheme !== null ? parseInt(savedTheme) : 0;
  });

  const themes = ["light", "dark", "mono", "contrast"];
  
  const themeNext = () => {
    setCurrentTheme((prevIndex) => (prevIndex + 1) % themes.length);
  };

  // Sync with localStorage whenever currentTheme changes
  useEffect(() => {
    localStorage.setItem("themeIndex", currentTheme);
    localStorage.setItem("theme", themes[currentTheme]);
    document.body.classList.remove("light", "dark", "mono", "contrast");
    document.body.classList.add(themes[currentTheme]);
  }, [currentTheme]);

  return (
    <div className="flex items-center justify-center rounded-3xl text-cw bg-prim w-32 h-12 cursor-pointer hover:opacity-80" onClick={themeNext}>
        {themes[currentTheme]}
    </div>);
}

export default ThemeSelector;