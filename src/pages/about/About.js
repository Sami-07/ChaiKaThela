import styles from "./About.module.css"
import CSBoutlet from "../../images/CSBoutlet.jpg"
import CSBoutlet2 from "../../images/CSBoutlet2.jpg"
import founder from "../../images/founder.png"
import AOS from "aos"
import "aos/dist/aos.css";
import { useTheme } from "../../hooks/useTheme"
import { useEffect } from "react"
export default function About() {
    useEffect(() => {
        AOS.init({ duration: 2000 })
    }, [])
    const { color, changeColor } = useTheme()
    return (
        <div className={styles.mainAbout} data-aos="fade-up">
            <p className={styles.aboutHeading}>About Us</p>
            <div className={styles.aboutContentSection} >
                <img className={styles.outletImg} src={CSBoutlet} data-aos="fade-up" ></img>
                <p className={styles.aboutContent} data-aos="fade-up"><span style={{ color : color }}>Chai ka Thela </span>  is an Indian café chain, with the objective of creating a positive perception of tea as a catalyst for inspiration. We aim to dispel the misconception associated with tea as merely a beverage, by positioning it as a tool for discussions on business plans, strategizing a successful future with peers, and working towards achieving goals.</p>
            </div>
            <div className={`${styles.aboutContentSection} ${styles.aboutContentSection2}`} >
                <img className={styles.outletImg} src={CSBoutlet2} data-aos="fade-up"></img>
                <p className={styles.aboutContent} data-aos="fade-up">We at <span style={{ color : color }}>Chai ka Thela </span> believe and understand that the whole being of humankind depends on the food they consume. Food that is affordable, reliable, and connected to their culture and ethos. Our chai is the medium of connection between friends, families and strangers. We strive to make everyone taste the soil of India through our Kulhad chai. Yet, we are more than a good Kulhad Chai.
                </p>
            </div>
            <p className={styles.foundersHead} data-aos="fade-up">Founder</p>
            <div className={styles.foundersSet} data-aos="fade-up">
                <div className={styles.founder} data-aos="fade-up">
                    <img className={styles.founderImg1}  src={founder} style={{ background: color }} ></img>

                </div>
                {/* style={{ background: color }} */}
                <div>
                    <p className={styles.founderBio}>
                       "Our mission is to ensure that every Indian gets to experience the exquisite delight of the finest tea, all at affordable prices. We believe that tea is not just a beverage, but an experience that should be cherished and accessible to all."</p>
                    <div className={styles.founderName}><p className={styles.founderFullName}>Shaikh Abdul Sami</p><p className={styles.founderRole} style={{ color : color }}>Founder and CEO, Chai ka Thela</p></div>
                </div>
            </div>
            <div className={styles.visionSection} data-aos="fade-up">
                <p className={styles.visionHead} data-aos="fade-up">Our Vision</p>
                <div className={styles.visionBox} style={{ background: color }}>
                    <p>"Our brand seeks to redefine the role of tea beyond a mere beverage, positioning it as a catalyst for personal well-being and mindfulness in today's fast-paced world. Our brand will serve as a platform for tea enthusiasts to share their own stories, traditions, and experiences, creating a vibrant tapestry of tea culture that transcends borders."</p>
                </div>
            </div>
        </div>
    )
}