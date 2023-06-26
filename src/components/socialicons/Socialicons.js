import styles from "./Socialicons.module.css"
import fb from "../../images/fb.png"
import insta from "../../images/insta.png"
import linkedin from "../../images/linkedin.png"
import twitter from "../../images/twitter.png"
export default function Socialicons() {
    return (
        <div className={styles.socialicons}>
            <img className={styles.socialIcon1} src={fb}></img>
            <img className={styles.socialIcon1} src={insta}></img>
            <img className={styles.socialIcon1} src={linkedin}></img>
            <img className={styles.socialIcon1} src={twitter}></img>
        </div>
    )
}