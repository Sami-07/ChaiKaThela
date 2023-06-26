import "./Home.css"
import homeImg from "../../images/homeImg.png"
import MyButton from "../../components/custombtn/MyButton"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import About from "../about/About"
import Catalogue from "../catalogue/Catalogue"
import Contact from "../contact/Contact"
import AiTea2 from "../../images/AiTea2.png"
import AOS from "aos"
import "aos/dist/aos.css";
import { useTheme } from "../../hooks/useTheme"

import { useAuthContext } from "../../hooks/useAuthContext"

export default function Home() {
    const { color, changeColor } = useTheme()
    const { user } = useAuthContext()
    useEffect(() => {
        AOS.init({ duration: 2000 })
    }, [])
    const [classActive, setClassActive] = useState(false)
    useEffect(() => {
        const interval = setInterval(() => {
            // setClassActive((prevClassActive) => !prevClassActive)
            setClassActive(true)
        }, 4000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    const [classActive2, setClassActive2] = useState(false)
    useEffect(() => {
        const interval = setInterval(() => {

            setClassActive2(true)
        }, 4000)
        return () => {
            clearInterval(interval)
        }
    }, [])



    return (
        <div data-aos="fade-up">
 {/* <p className="userNameHome">Welcome, {user.displayName}</p> */}
            <div className="homeComponent" >

                <img className="homePageImg" src={AiTea2} />

                <div className="buttonFlex">
                    <div className="homeHook">
                       
                        <span className="mySpan">
                            True <span className={`span2 ${classActive ? "strickThrough" : ""}`}>Chai</span> <span className="span2"> चाय  </span>    Lovers
                        </span>
                        <br></br>
                        <span className={`mySpan2 ${classActive2 ? "cursorAnimation" : ""}`}>
                            always choose us.
                        </span>
                    </div>
                    <div className="hookBtns">
                        <Link to="/catalogue">
                            <MyButton btnText="View Catalogue" mTop="0px"  width="230px" borderRadius="20px" bgColor={color} />
                        </Link>
                        <Link to="/brewtea">
                            <MyButton btnText="Brew Your Tea" mTop="0px" width="230px" borderRadius="20px" bgColor={color} />
                        </Link>
                    </div>
                </div>
            </div>

            <About />

            <Catalogue />
            <Contact />
        </div>
    )
}