import styles from "./Footer.module.css"
import chaiLogo from "../../images/chaiLogo.png"
import Socialicons from "../socialicons/Socialicons"
import { useEffect, useState } from "react"
import { useTheme } from "../../hooks/useTheme"
export default function Footer() {
    const [newYear, setNewYear] = useState()
    const { color, changeColor } = useTheme()
    useEffect(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        setNewYear(currentYear)
    }, [])
    return (
        <div className={styles.footerContainer} style={{ background: color }}>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319"><path fill="#FFFFFF" fill-opacity="1" d="M0,64L80,80C160,96,320,128,480,122.7C640,117,800,75,960,64C1120,53,1280,75,1360,85.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg> */}
            <div className={styles.logoTitle}> <img className={styles.mainLogo} src={chaiLogo} />
                <p> चाय का ठेला</p>
            </div>
            <p>चाय का ठेला copyright &copy;  {newYear} All rights reserved.</p>
            <Socialicons />
            <p className={styles.creator}>
                Website designed and created by <a href="https://www.linkedin.com/in/shaikh-abdul-sami-879287211/">
                    <br /> Shaikh Abdul Sami</a>
            </p>
        </div>
    )
}





