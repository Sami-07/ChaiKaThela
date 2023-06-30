import styles from "./Contact.module.css"
import contacticon from "../../images/contacticon.svg"
import mailicon from "../../images/mailicon.svg"
import locationicon from "../../images/locationicon.svg"
import MyButton from "../../components/custombtn/MyButton"
import Socialicons from "../../components/socialicons/Socialicons"
import { useEffect, useRef, useState } from "react"
import emailjs from '@emailjs/browser';
import AOS from "aos"
import "aos/dist/aos.css";
import { useTheme } from "../../hooks/useTheme"
export default function Contact() {

    useEffect(() => {
        AOS.init({ duration: 2000 })
    }, [])

    const { color, changeColor } = useTheme()
    const [status, setStatus] = useState(false)
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(process.env.REACT_APP_YOUR_SERVICE_ID, process.env.REACT_APP_YOUR_TEMPLATE_ID, form.current, process.env.REACT_APP_YOUR_PUBLIC_KEY)
            .then((result) => {
                e.target.reset()
                setStatus(true)
                setTimeout(() => {
                    setStatus(false);
                }, 3000);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div className={styles.mainContact} data-aos="fade-up" >
            <p className={styles.contactHead}>Contact Us</p>
            <p className={styles.contactSubHead}>If you have any queries, feel free to message here.</p>
            <div className={styles.contactBox} data-aos="fade-up">
                <div className={styles.contactCol1} style={{ background: color }}  >
                    <p className={styles.contactHead2}>Contact Details</p>
                    <p className={styles.contactDesc}>Fill the adjacent form. Our customer service will reach out to you via email within 24 hours.</p>
                    <div className={styles.contactDetails}>
                        <div className={styles.contact1}>  <img src={contacticon} className={styles.icon1}></img><p>+91 0123456789</p></div>
                        <div className={styles.contact1}>  <img src={mailicon} className={styles.icon1}></img><p>support@chaikathela.com</p></div>
                        <div className={styles.contact1}>  <img src={locationicon} className={styles.icon1}></img><p>6/A-102, Silicon Valley</p></div>
                        <Socialicons />
                    </div>
                </div>
                <form ref={form} onSubmit={sendEmail} className={styles.contactCol2}>
                    <div className={styles.subCol2}>
                        <input type="text" placeholder="first name" name="first_name"></input>
                        <input type="text" placeholder="last name" name="last_name"></input>
                        <input type="email" placeholder="email" name="email"></input>
                        <input type="text" placeholder="phone no" name="phone"></input>
                    </div>
                    <div className={styles.subdiv2}>  <input className={styles.ContactSubject} type="text" placeholder="subject" name="subject"></input>
                        <textarea name="message" placeholder="Starting writing here..."></textarea></div>
                    {!status && <MyButton bgColor={color} valueID="send" btnText="Send" position="center" />}
                    {status && <MyButton width="250px" btnText="Sent Successfully" bgColor="green" position="center" />}
                </form>
            </div>
        </div>
    )
}