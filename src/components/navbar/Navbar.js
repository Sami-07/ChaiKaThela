import "./Navbar.css"
import { NavLink } from "react-router-dom"
import chaiLogo from "../../images/chaiLogo.png"
import cartIcon from "../../images/cartIcon.png"
import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { useLogout } from "../../hooks/useLogout"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useTheme } from "../../hooks/useTheme"


export default function Navbar() {
    const { color , changeColor} = useTheme()

    const NavClick = () => {
        window.scrollTo(0, 0);
        setClicked(false)
    };
    const [clicked, setClicked] = useState(false)

    function handleClick() {
        setClicked(!clicked)
    }
    const [showCartIcon, setShowCartIcon] = useState(true)
    const { logout } = useLogout()
    const { user } = useAuthContext()
    return (
        <div className="navCover">
            <nav className="navbar"
                style={{ background: color }}>
                <div className="logoTabs">
                    <div className="logoDiv" >
                        <img className="mainLogo" src={chaiLogo}>
                        </img>
                        <div className="title brand" >
                            चाय का ठेला
                        </div>
                    </div>
                    <div className={`right ${clicked ? "active" : ""}`}  style={{ background: color }}>
                     
                        <li className="title">
                            <NavLink to="/" onClick={NavClick}>
                                Home
                            </NavLink>                    </li>
                        <li className="title" onClick={NavClick}>
                            <NavLink to="/about">
                                About
                            </NavLink>                    </li>
                        <li className="title">
                            <NavLink to="/catalogue" onClick={NavClick}>
                                Catalogue
                            </NavLink>
                        </li>
                        <li className="title">
                            <NavLink to="/brewtea" onClick={NavClick}>
                                Custom Tea
                            </NavLink>
                        </li>
                        <li className="title">
                            <NavLink to="/contact" onClick={NavClick}>
                                Contact
                            </NavLink>                    </li>
                        {!user && <li className="title">
                            <NavLink to="/signup" onClick={NavClick}>
                                Signup
                            </NavLink>                    </li>}
                        <li className="title">
                            <NavLink to="/profile" onClick={NavClick}>
                                Profile

                            </NavLink>                    </li>

                        {user && <button className="title" onClick={logout} style={{ background: "transparent", border: "none", fontFamily: "Work Sans", fontSize: "16px", cursor: "pointer", display: "flex", justifyContent: "center" }}>
                            Logout
                        </button>}

                    </div>

                </div>
            </nav>
            <div className="hamDiv">
                <div className="hamburger" onClick={handleClick} >
                    <span className="line" />
                    <span className="line" />
                    <span className="line" />
                </div>
            </div>
            {
                user &&
                <Link to="/cart">
                    <img src={cartIcon} className={`cartIcon ${clicked ? "cartIconResp" : ""}`} style={{ background: color }} ></img>
                </Link>

            }

        </div>
    )
}