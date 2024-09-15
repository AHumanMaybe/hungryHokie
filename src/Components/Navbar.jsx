import NavListItem from "./NavListItem";
import { useLocation } from "react-router-dom"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import ThemeSelector from "./ThemeSelector";

function Navbar(){

    const navigate = useNavigate()

    const location = useLocation()
    console.log("Current Page:", location.pathname);
    const currentPage = location.pathname

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username")

    const navbarItems = [
        {text: "Home", link: "/"},
        {text: "Log", link: "/log"},
        { text: isLoggedIn ? username : "Login", link: isLoggedIn ? "/login" : "/login" }
    ]

    return(
        <nav className="w-full text-bgl text-3xl font-normal bg-bg text-txt">
            <div className="flex items-center justify-between pt-4 px-8 border-b border-bg2 pb-2">
                {/* Waffle Menu Button */}
                <div className="lg:hidden">
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className="focus:outline-none">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>

                {/* Logo or Main Link */}
                <div className="flex-grow lg:flex-grow-0">
                    <NavListItem text="HungryHokies" link="/" currentPage={currentPage} />
                </div>
                <div>
                    <ThemeSelector/>
                </div>

                {/* Navbar Items for Large Screens */}
                <ul className={`hidden lg:flex items-center space-x-8`}>
                    {navbarItems.slice(1).map((item, index) => (
                        <NavListItem key={index} text={item.text} link={item.link} currentPage={currentPage} />
                    ))}
                </ul>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <ul className="lg:hidden flex flex-col items-center mt-4 space-y-2">
                    {navbarItems.map((item, index) => (
                        <>
                            <NavListItem key={index} text={item.text} link={item.link} currentPage={currentPage} />
                            <div className="w-3/4 h-0.5 bg-bgd"/>
                        </>
                        
                    ))}
                </ul>
            )}
        </nav>
    )
}

export default Navbar;