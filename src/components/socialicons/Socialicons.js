import styles from "./Socialicons.module.css"
import fb from "../../images/fb.png"
import insta from "../../images/insta.png"
import linkedin from "../../images/linkedin.png"
import twitter from "../../images/twitter.png"
import web from "../../images/web.png"
export default function Socialicons() {
    return (
        <div className={styles.socialicons}>
            <a href="https://www.instagram.com/ig_sami7/" > <img className={styles.socialIcon1} src={insta}></img> </a>
            <a href="https://www.linkedin.com/in/shaikh-abdul-sami-879287211/" > <img className={styles.socialIcon1} src={linkedin}></img> </a>
            <a href="https://twitter.com/sami73010">  <img className={styles.socialIcon1} src={twitter}></img> </a>
            <a href="https://abdulsami-sami-07.vercel.app/">  <img className={styles.socialIcon1} src={web}></img> </a>
        </div>
    )
}