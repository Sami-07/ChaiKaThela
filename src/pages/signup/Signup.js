import styles from "./Signup.module.css"
import { Link } from "react-router-dom"
import MyButton from "../../components/custombtn/MyButton"
import MyInput from "../../components/myinput/MyInput"
import googleicon from "../../images/googleicon.png"
import fb2 from "../../images/fb2.png"
import { useState } from "react"
import { useSignup } from "../../hooks/useSignup"
import { auth, provider } from "../../firebase/config"
import { UserAuth } from "../../context/AuthContext"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css";
import { useTheme } from "../../hooks/useTheme"


export default function Signup() {
    const { authIsReady, user } = useAuthContext()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, SetDisplayName] = useState("")
    const { signup, isPending, error } = useSignup()
    const { googleSignIn } = UserAuth()
    const { color , changeColor} = useTheme()
    function handleSubmit(e) {
        e.preventDefault()
        signup(email, password, displayName)
        setEmail("")
        setPassword("")
        SetDisplayName("")
    }
    async function handleClick() {
        try {
            await googleSignIn()

        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        AOS.init({ duration: 2000 })
    }, [])
    return (
        <div>   <div className={styles.mainSinupComponent}  data-aos="fade-up">
            <form onSubmit={handleSubmit} className={styles.singnupComponent} >
                <label>

                    <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </label>
                <label>

                    <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </label>
                <label>

                    <input type="text" placeholder="Your Name" onChange={(e) => SetDisplayName(e.target.value)} value={displayName} />
                </label>

                {!isPending && <MyButton btnText="Signup" bgColor={color} fontSize="22px" width="170px"
                    height="50px" borderRadius="20px" />}
                {isPending && <MyButton btnText="Loading" bgColor="green" fontSize="22px" width="170px"
                    height="50px" borderRadius="20px" />}
            </form>




            <p className={styles.alreadyAcc}>already have an account? <button>
                <Link to="/login">
                    Login
                </Link>
            </button>
            </p>


            <div className={styles.otherSignin}>
                <button className={styles.otherSignInBtn} onClick={handleClick} >
                    <img className={styles.signinLogo} src={googleicon} />Sign in with Google</button>
                {/* <button className={styles.otherSignInBtn} >
                    <img className={styles.signinLogo} src={fb2} />
                    sign in with Facebook</button> */}
            </div>

        </div>

        </div>
    )
}